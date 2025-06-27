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