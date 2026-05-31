(() => {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;

  const sub = el.parentElement.querySelector(".preview__counter-sub");

  const pad = (n) => String(n).padStart(2, "0");

  const nextLive = () => {
    const now = new Date();
    const t = new Date(now);
    t.setHours(9, 0, 0, 0);

    // If we're past 9h today, target tomorrow.
    if (now >= t) t.setDate(t.getDate() + 1);

    // Are we currently inside the live window (9–10h)?
    const start = new Date(now); start.setHours(9, 0, 0, 0);
    const end   = new Date(now); end.setHours(10, 0, 0, 0);
    const isLiveNow = now >= start && now < end;

    return { target: t, isLiveNow, end };
  };

  const tick = () => {
    const { target, isLiveNow, end } = nextLive();

    if (isLiveNow) {
      const remaining = end - new Date();
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      el.textContent = `${pad(m)}:${pad(s)} restantes`;
      el.style.color = "#ff6a3d";
      if (sub) sub.textContent = "ao vivo agora · entre e vem com a gente";
      return;
    }

    const diff = target - new Date();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.textContent = `${pad(h)}h ${pad(m)}m ${pad(s)}s`;

    if (sub) {
      const isToday = target.toDateString() === new Date().toDateString();
      const isTomorrow =
        target.toDateString() ===
        new Date(Date.now() + 86400000).toDateString();
      const when = isToday ? "hoje" : isTomorrow ? "amanhã" : target.toLocaleDateString("pt-BR");
      sub.textContent = `${when} · 9h00 (BRT)`;
    }
  };

  tick();
  setInterval(tick, 1000);
})();
