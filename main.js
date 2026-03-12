function setupToggleDone(listEl) {
  if (!listEl) return;

  // Make list items keyboard reachable
  for (const li of listEl.querySelectorAll("li")) {
    if (!li.hasAttribute("tabindex")) li.setAttribute("tabindex", "0");
    li.setAttribute("role", "button");
    li.setAttribute("aria-pressed", li.classList.contains("is-done") ? "true" : "false");
  }

  const toggle = (li) => {
    const next = !li.classList.contains("is-done");
    li.classList.toggle("is-done", next);
    li.setAttribute("aria-pressed", next ? "true" : "false");
  };

  listEl.addEventListener("click", (e) => {
    const li = e.target?.closest?.("li");
    if (!li || !listEl.contains(li)) return;
    toggle(li);
  });

  listEl.addEventListener("keydown", (e) => {
    const li = e.target?.closest?.("li");
    if (!li || !listEl.contains(li)) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(li);
    }
  });
}

function setupImageModal(imgEl) {
  if (!imgEl) return;

  const overlay = document.createElement("div");
  overlay.className = "img-modal";
  overlay.setAttribute("aria-hidden", "true");

  const dialog = document.createElement("div");
  dialog.className = "img-modal__dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", imgEl.alt || "이미지 확대보기");

  const big = document.createElement("img");
  big.className = "img-modal__img";
  big.alt = imgEl.alt || "확대 이미지";

  const hint = document.createElement("div");
  hint.className = "img-modal__hint";
  hint.textContent = "닫기: ESC / 바깥 클릭";

  dialog.append(big, hint);
  overlay.append(dialog);
  document.body.append(overlay);

  const open = () => {
    big.src = imgEl.currentSrc || imgEl.src;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  };

  imgEl.style.cursor = "zoom-in";
  imgEl.addEventListener("click", open);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  window.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupToggleDone(document.getElementById("todoList"));
  setupToggleDone(document.getElementById("planList"));
  setupImageModal(document.querySelector(".profile-image"));
});

