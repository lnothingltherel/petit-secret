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

const form = document.querySelector("#questions-form");
const results = document.querySelector("#results");
const copyButton = document.querySelector("#copy-results");
const copyStatus = document.querySelector("#copy-status");
let preparedAnswers = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  preparedAnswers =
    `Réponses d'Alicia au petit questionnaire 💌\n` +
    `Comment te sens-tu aujourd'hui ? ${data.get("journee")}\n` +
    `Qu'est-ce qui t'a fait sourire aujourd'hui ? ${data.get("prefere")}\n` +
    `Jeux ou activités à faire ensemble : ${data.get("jeux") || "Pas de réponse"}\n` +
    `Un petit mot : ${data.get("mot") || "Pas de réponse"}`;
  results.classList.remove("hidden");
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(preparedAnswers);
    copyStatus.textContent = "Réponses copiées ! Tu peux maintenant me les envoyer 💜";
  } catch {
    copyStatus.textContent = preparedAnswers;
  }
});
