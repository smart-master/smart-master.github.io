// Odeslání formuláře s validací a zprávami
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const messageField = form.querySelector('[name="message"]');

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Vymazání předchozích chyb
    [nameError, emailError, messageError].forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
    status.textContent = "";
    status.style.color = "";

    // Validace
    let valid = true;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name) {
      nameError.textContent = "Zadejte prosím jméno.";
      nameError.style.display = "block";
      valid = false;
    } else if (name.length < 3) {
      nameError.textContent = "Jméno musí mít alespoň 3 znaky.";
      nameError.style.display = "block";
      valid = false;
    }

    if (!email) {
      emailError.textContent = "Email je povinný.";
      emailError.style.display = "block";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Zadejte platný e-mail.";
      emailError.style.display = "block";
      valid = false;
    }

    if (!message) {
      messageError.textContent = "Zadejte prosím zprávu.";
      messageError.style.display = "block";
      valid = false;
    } else if (message.length < 5) {
      messageError.textContent = "Zpráva musí obsahovat alespoň 5 znaků.";
      messageError.style.display = "block";
      valid = false;
    }

    if (!valid) return;

    // Odeslání formuláře
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        status.textContent = "Děkujeme! Vaše zpráva byla úspěšně odeslána.";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "Chyba při odesílání. Zkuste to prosím později.";
        status.style.color = "red";
      }
    } catch (err) {
      status.textContent = "Nelze se spojit se serverem. Zkuste to později.";
      status.style.color = "red";
    }
  });
});