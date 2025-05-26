document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-format");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    messageDiv.style.display = "none";
    messageDiv.textContent = "";

    if (username === "") {
      messageDiv.textContent = "⚠️ Please enter your username.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      usernameInput.focus();
      return;
    }

    if (password === "") {
      messageDiv.textContent = "⚠️ Please enter your password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      passwordInput.focus();
      return;
    }

    // Recupera gli utenti dal localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Cerca l'utente con username e password corrispondenti
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      messageDiv.textContent = "❌ Invalid username or password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      return;
    }

    // Salva l'utente loggato nel localStorage
    localStorage.setItem("user", JSON.stringify(user));

    messageDiv.textContent = "✅ Login successful!";
    messageDiv.style.display = "block";
    messageDiv.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
});
