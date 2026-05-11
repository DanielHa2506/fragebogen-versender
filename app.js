(function () {
  const emailInput = document.getElementById("email");
  const grid = document.getElementById("grid");
  const dialog = document.getElementById("dialog");
  const dialogText = document.getElementById("dialog-text");
  const dialogConfirm = document.getElementById("dialog-confirm");
  const dialogCancel = document.getElementById("dialog-cancel");
  const toast = document.getElementById("toast");

  let toastTimer = null;
  let pendingConfirm = null;

  function isValidEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  function getToken() {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    return new URLSearchParams(hash).get("k") || "";
  }

  function showToast(message, isError) {
    toast.textContent = message;
    toast.classList.toggle("toast--error", !!isError);
    toast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
  }

  function showError(msg) { showToast(msg, true); }
  function showSuccess(msg) { showToast("✓ " + msg, false); }

  function openConfirm(label, email) {
    return new Promise((resolve) => {
      dialogText.innerHTML = "";
      const strong = document.createElement("strong");
      strong.textContent = label;
      const code = document.createElement("code");
      code.textContent = email;
      dialogText.append(strong, " an ", code, " senden?");
      dialog.hidden = false;
      pendingConfirm = resolve;
    });
  }

  function closeConfirm(result) {
    dialog.hidden = true;
    if (pendingConfirm) {
      const r = pendingConfirm;
      pendingConfirm = null;
      r(result);
    }
  }

  dialogConfirm.addEventListener("click", () => closeConfirm(true));
  dialogCancel.addEventListener("click", () => closeConfirm(false));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeConfirm(false);
  });

  function buildGrid() {
    CONFIG.questionnaires.forEach((q) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile";
      btn.textContent = q.label;
      btn.dataset.key = q.key;
      btn.addEventListener("click", () => handleClick(q));
      grid.appendChild(btn);
    });
  }

  async function handleClick(q) {
    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      showError("Bitte gültige Mailadresse eingeben.");
      emailInput.focus();
      return;
    }

    const confirmed = await openConfirm(q.label, email);
    if (!confirmed) return;

    const token = getToken();
    if (!token) {
      showError("Token fehlt in der URL. Bitte den hinterlegten Link verwenden.");
      return;
    }

    try {
      const res = await fetch(CONFIG.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ token, recipient: email, key: q.key })
      });
      const data = await res.json();
      if (data.ok) {
        showSuccess(q.label + " gesendet");
        emailInput.value = "";
        emailInput.focus();
      } else {
        showError(data.error || "Versand fehlgeschlagen.");
      }
    } catch (err) {
      showError("Verbindungsfehler. Bitte erneut versuchen.");
    }
  }

  buildGrid();
  setTimeout(() => emailInput.focus(), 100);
})();
