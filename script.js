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
    if (value.toLowerCase() === "cyber@12") {
      respLine.textContent = "✅ ayman@1";
      respLine.classList.add("term-line-success");
    } else {
      respLine.textContent = "❌ Wrong password";
      respLine.classList.add("term-line-error");
    }
    terminalLog.appendChild(respLine);

    terminalCommand.value = "";
    terminalCommand.focus();
  });
}


