// Бургер-меню
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const body = document.body;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  // Закриваємо меню при кліку поза ним
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.closest("#burger") && menu.classList.contains("active")) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      body.classList.remove("no-scroll");
    }
  });

  // Кнопка "Вгору"
  const toTopBtn = document.getElementById("toTopBtn");

  window.addEventListener("scroll", () => {
    toTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openFormBtn");
  const popup = document.getElementById("contactPopup");
  const closeBtn = document.getElementById("closeFormBtn");

  openBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

  // Закриття по кліку поза формою
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
  });
});