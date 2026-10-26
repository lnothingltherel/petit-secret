// Personnalise les textes de cette liste pour modifier l'histoire du site.
const messages = [
  "Prends ton temps, Alicia. Cet endroit a été préparé rien que pour toi, avec tout mon cœur. 💜",
  "Il y a des personnes qui arrivent dans une vie et qui, sans rien faire de spécial, rendent tout plus doux. Pour moi, cette personne, c'est toi. ✨",
  "Avec toi, j'ai l'impression que le temps ralentit. Une simple conversation devient mon moment préféré de la journée. 🌙",
  "Je crois que certaines âmes se reconnaissent, comme si elles s'étaient déjà croisées quelque part. C'est exactement ce que je ressens avec toi. 💫",
  "Je ne sais pas écrire les mots parfaits, alors j'ai construit un petit ciel étoilé. Parce que tu brilles comme chacune de ces étoiles. ✦",
  "Alicia, tu es mon âme sœur. Merci d'être là, et d'être toi, tout simplement. Si tu veux bien, j'ai quelques petites questions pour toi. 💌"
];

const messageText = document.querySelector("#message-text");
const nextButton = document.querySelector("#next-message");
const messageSection = document.querySelector("#message");
const questionnaire = document.querySelector("#questionnaire");
let messageIndex = 0;

nextButton.addEventListener("click", () => {
  messageIndex += 1;
  if (messageIndex < messages.length) {
    messageText.textContent = messages[messageIndex];
    if (messageIndex === messages.length - 1) nextButton.textContent = "Voir la suite ✦";
  } else {
    messageSection.classList.add("hidden");
    questionnaire.classList.remove("hidden");
  }
});

// Étoiles générées localement : aucune image lourde à télécharger.
const stars = document.querySelector("#stars");
for (let i = 0; i < 95; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2 + Math.random() * 4}s`;
  stars.appendChild(star);
}

// Petite traînée de cœurs sur PC.
document.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch" || Math.random() > 0.18) return;
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "♡";
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.querySelector("#cursor-hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 950);
});

const FORMSPREE_URL = "https://formspree.io/f/mzeeeyrp";

const form = document.querySelector("#questions-form");
const results = document.querySelector("#results");
const sendStatus = document.querySelector("#send-status");
const copyButton = document.querySelector("#copy-results");
const copyStatus = document.querySelector("#copy-status");
const submitButton = form.querySelector('button[type="submit"]');
let preparedAnswers = "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const answers = {
    "Comment te sens-tu aujourd'hui ?": data.get("journee"),
    "Qu'est-ce qui t'a fait sourire aujourd'hui ?": data.get("prefere"),
    "Jeux ou activites a faire ensemble": data.get("jeux") || "Pas de réponse",
    "Un petit mot": data.get("mot") || "Pas de réponse"
  };

  preparedAnswers =
    `Réponses d'Alicia au petit questionnaire 💌\n` +
    Object.entries(answers).map(([question, reponse]) => `${question} ${reponse}`).join("\n");

  submitButton.disabled = true;
  submitButton.textContent = "Envoi…";

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ _subject: "Les réponses d'Alicia 💌", ...answers })
    });
    if (!response.ok) throw new Error("Envoi refusé");
    form.classList.add("hidden");
    results.classList.remove("hidden");
    sendStatus.textContent = "Merci Alicia, tes réponses me sont bien parvenues 💜";
  } catch {
    results.classList.remove("hidden");
    sendStatus.textContent = "Oups, l'envoi n'a pas marché. Tu peux copier tes réponses et me les envoyer 💜";
    copyButton.classList.remove("hidden");
    submitButton.disabled = false;
    submitButton.textContent = "Réessayer ✦";
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(preparedAnswers);
    copyStatus.textContent = "Réponses copiées ! Tu peux maintenant me les envoyer 💜";
  } catch {
    copyStatus.textContent = preparedAnswers;
  }
});
