document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const popup = document.getElementById("contactPopup"); // модальне вікно

  const nameField = form.querySelector('[name="name"]');
  const emailField = form.querySelector('[name="email"]');
  const messageField = form.querySelector('[name="message"]');

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Очистка попередніх помилок
    nameError.style.display = emailError.style.display = messageError.style.display = "none";

    let hasError = false;

    if (!nameField.value.trim()) {
      nameError.textContent = "Zadejte jméno";
      nameError.style.display = "block";
      hasError = true;
    }

    if (!emailField.value.trim() || !/\S+@\S+\.\S+/.test(emailField.value)) {
      emailError.textContent = "Zadejte platný email";
      emailError.style.display = "block";
      hasError = true;
    }

    if (!messageField.value.trim()) {
      messageError.textContent = "Napište zprávu";
      messageError.style.display = "block";
      hasError = true;
    }

    if (hasError) return;

    // Відправлення даних
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Zpráva byla úspěšně odeslána.";
        status.style.color = "green";
        form.reset();

        // ⏳ Закриття форми через 4 секунди
        setTimeout(() => {
          popup.classList.add("hidden");
          document.body.classList.remove("no-scroll");
          status.textContent = ""; // Очистити повідомлення
        }, 4000);

      } else {
        const data = await response.json();
        if (data.errors) {
          status.textContent = data.errors.map(err => err.message).join(", ");
        } else {
          status.textContent = "Nastala chyba při odesílání.";
        }
        status.style.color = "red";
      }

    } catch (error) {
      status.textContent = "Došlo k síťové chybě.";
      status.style.color = "red";
    }
  });
});