const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Quest state is deliberately local to this browser. It is not sent to GitHub.
document.querySelectorAll("[data-quest]").forEach((checkbox) => {
  const key = `arushi-rpg-quest-${checkbox.dataset.quest}`;
  checkbox.checked = localStorage.getItem(key) === "done";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(key, checkbox.checked ? "done" : "todo");
  });
});

const projectData = {
  veritas: {
    title: "VERITAS — Digital Safety",
    body: "Project summary placeholder: describe only features that are implemented and tested. Add the repository URL, architecture, what you personally built, and known limitations. Avoid claiming that a feature is production-ready unless it has been verified.",
    url: "https://github.com/ArushiShetty?tab=repositories"
  },
  obscura: {
    title: "OBSCURA — Travel App",
    body: "Project summary placeholder: if the app is still in progress, say so. Document the working user flows, chosen stack, setup instructions, screenshots, and next milestone. A clear in-progress project is better than overstating its completion.",
    url: "https://github.com/ArushiShetty?tab=repositories"
  },
  sign: {
    title: "Sign Language Detection",
    body: "Project summary placeholder: specify the supported classes or signs, dataset source, model architecture, evaluation method, and team contributions once confirmed. Include a demo and limitations when available.",
    url: "https://github.com/ArushiShetty?tab=repositories"
  },
  agent: {
    title: "Autonomous Test Agent",
    body: "Describe the verified capabilities of the autonomous QA agent here: how it receives a task, plans or generates tests, executes them, handles failures, and reports results. Link to the actual repository and state which parts you personally implemented.",
    url: "https://github.com/ArushiShetty?tab=repositories"
  },
  lexicon: {
    title: "Lexicon-Gate",
    body: "Add the actual research problem, target users, core workflow, tech stack, and current status here. Be specific about your contribution and avoid implying features are complete if they are still planned.",
    url: "https://github.com/ArushiShetty?tab=repositories"
  }
};

const dialog = document.querySelector("#project-dialog");
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    if (!project || !dialog) return;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-body").textContent = project.body;
    document.querySelector("#dialog-link").href = project.url;
    dialog.showModal();
  });
});

// Optional tiny synth chime; no audio file or third-party library needed.
let audioContext;
let soundEnabled = false;
const soundButton = document.querySelector("#sound-toggle");
soundButton?.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = `♪ SOUND: ${soundEnabled ? "ON" : "OFF"}`;
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  if (soundEnabled) playChime();
});
function playChime() {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.09);
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
  } catch (error) {
    // Audio is an optional enhancement; the portfolio still works without it.
    console.info("Audio is unavailable in this browser.", error);
  }
}
