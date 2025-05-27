async function getUsers() {
  const users = await fetch("../data/users.json");
  return await users.json();
}

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("users")) {
    // If users are not in localStorage, fetch them and store
    getUsers()
      .then((data) => {
        localStorage.setItem("users", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

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

    // Get the users from localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    // Search for the user with matching username and password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      messageDiv.textContent = "❌ Invalid username or password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      return;
    }

    // Save the logged-in user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    messageDiv.textContent = "✅ Login successful!";
    messageDiv.style.display = "block";
    messageDiv.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
});
