// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Glitch mode toggle
const btnToggleGlitch = document.getElementById("btnToggleGlitch");
if (btnToggleGlitch) {
  btnToggleGlitch.addEventListener("click", () => {
    document.body.classList.toggle("glitch");
  });
}

// Terminal log + simple password check (sans lignes automatiques)
const terminalLog = document.getElementById("terminal-log");
const terminalForm = document.getElementById("terminal-form");
const terminalCommand = document.getElementById("terminal-command");

// Compteur de tentatives incorrectes
let wrongAttempts = 0;
const MAX_WRONG_ATTEMPTS = 2;

// Fonction pour réinitialiser le terminal
function resetTerminal() {
  if (terminalLog) {
    terminalLog.innerHTML = `
      <p>&gt; Initialisation du challenge Stegano...</p>
      <p>&gt; Chargement des images secrètes... OK</p>
      <p>&gt; Indice: Chaque mot de passe commence par le mot visible.</p>
      <p>&gt; En attente de ton premier mot de passe</p>
    `;
  }
  wrongAttempts = 0;
  if (terminalCommand) {
    terminalCommand.value = "";
    terminalCommand.focus();
  }
}

if (terminalForm && terminalCommand && terminalLog) {
  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = terminalCommand.value.trim();
    if (!value) return;

    // Afficher la commande tapée
    const cmdLine = document.createElement("p");
    cmdLine.textContent = `> ${value}`;
    terminalLog.appendChild(cmdLine);

    // Réponse selon le mot de passe
    const respLine = document.createElement("p");
    if (value.toLowerCase() === "cyberatlas@0001") {
      respLine.textContent = "✅ rakomghadin";
      respLine.classList.add("term-line-success");
    } else if (value.toLowerCase() === "safi@2222") {
      respLine.textContent = "✅ chwiua3lalwahed";
      respLine.classList.add("term-line-success");
    } else if (value.toLowerCase() === "hacker@6565") { // ✅ Supprimé les espaces avant/après
      respLine.textContent = "✅ serbiw";
      respLine.classList.add("term-line-success");
    } else {
      respLine.textContent = "❌ Wrong password";
      respLine.classList.add("term-line-error");
      wrongAttempts++;

      // Si 2 tentatives incorrectes, rafraîchir le terminal
      if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
        setTimeout(() => {
          resetTerminal();
        }, 1000);
      }
    }
    terminalLog.appendChild(respLine);

    terminalCommand.value = "";
    terminalCommand.focus();
  });
}

// Answer form validation
const answerForm = document.getElementById("answer-form");
const errorMessage = document.getElementById("error-message");

// Réponses correctes
const correctAnswers = {
  box1: "cyberatlas",
  box2: "the_best_club",
  box3: "ntouma_ahssen_equipe_<3"
};

if (answerForm) {
  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const box1Value = document.getElementById("box1").value.trim().toLowerCase();
    const box2Value = document.getElementById("box2").value.trim().toLowerCase();
    const box3Value = document.getElementById("box3").value.trim().toLowerCase();

    // Vérifier les réponses
    if (box1Value === correctAnswers.box1 && 
        box2Value === correctAnswers.box2 && 
        box3Value === correctAnswers.box3) {
      // Rediriger vers la page de félicitation
      window.location.href = "success.html";
    } else {
      // Afficher un message d'erreur
      errorMessage.textContent = "❌ Réponses incorrectes. Réessayez !";
      errorMessage.classList.add("show");
      
      // Masquer le message après 3 secondes
      setTimeout(() => {
        errorMessage.classList.remove("show");
      }, 3000);
    }
  });
}