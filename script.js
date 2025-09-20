// Global setup
const hero = document.getElementById("hero");
const app = document.getElementById("app");
const openCard = document.getElementById("openCard");

document.getElementById("bfName").textContent = CONFIG.boyfriendName;
document.getElementById("senderName").textContent = CONFIG.senderName;

// Background music toggle
const bgm = document.getElementById("bgm");
const muteToggle = document.getElementById("muteToggle");
if (CONFIG.soundEnabled) {
  bgm.volume = 0.3;
  bgm.play().catch(() => { });
}
muteToggle.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    muteToggle.textContent = "🔊 Music On";
  } else {
    bgm.pause();
    muteToggle.textContent = "🔇 Music Off";
  }
});

// Show app when button clicked
openCard.addEventListener("click", () => {
  hero.style.display = "none";
  app.style.display = "block";
});

// Tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.hidden = true);
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).hidden = false;
  });
});

// Love Letter
(function () {
  const panel = document.getElementById("panel-letter");
  let idx = 0;
  const msgEl = document.createElement("p");
  const btn = document.createElement("button");
  btn.textContent = "💌";
  btn.className = "btn";
  msgEl.textContent = CONFIG.messages[idx];
  panel.appendChild(msgEl);
  panel.appendChild(btn);
  btn.addEventListener("click", () => {
    idx++;
    if (idx < CONFIG.messages.length) {
      msgEl.textContent = CONFIG.messages[idx];
    } else {
      msgEl.textContent = "💙 That's all my words... for now.";
      btn.remove();
    }
  });
})();

// Gift Box
(function () {
  const panel = document.getElementById("panel-gift");
  CONFIG.giftItems.forEach(g => {
    const div = document.createElement("div");
    div.innerHTML = `<p><a href='${g.href}' target='_blank'>${g.label}</a> – ${g.note}</p>`;
    panel.appendChild(div);
  });
})();

// Quiz
(function () {
  const panel = document.getElementById("panel-quiz");
  CONFIG.quiz.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p><b>${q.q}</b></p>`;
    q.options.forEach((opt, j) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "btn secondary";
      btn.addEventListener("click", () => {
        if (j === q.answer) {
          alert("✅ Correct!");
        } else {
          alert("❌ Nope, try again!");
        }
      });
      qDiv.appendChild(btn);
    });
    panel.appendChild(qDiv);
  });
})();

// Countdown
(function () {
  const panel = document.getElementById("panel-count");
  const title = document.createElement("h3");
  title.textContent = CONFIG.countdownTitle;
  panel.appendChild(title);
  const timeEl = document.createElement("div");
  panel.appendChild(timeEl);
  function updateCountdown() {
    const target = new Date(CONFIG.countdownTo).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      timeEl.textContent = "🎉 It's time!";
      return;
    }
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor((diff / 1000 / 60 / 60) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    timeEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// Love Generator
(function () {
  const panel = document.getElementById("panel-generator");
  const btn = document.createElement("button");
  btn.textContent = " 💙 Tell me a reason";
  btn.className = "btn";
  const out = document.createElement("p");
  panel.appendChild(btn);
  panel.appendChild(out);
  btn.addEventListener("click", () => {
    const reason = CONFIG.reasons[Math.floor(Math.random() * CONFIG.reasons.length)];
    out.textContent = reason;
  });
})();
