async function getUsers() {
  // Fetches user data from a local JSON file.
  const users = await fetch("../data/users.json");
  // Parses the JSON response and returns the data.
  return await users.json();
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if user data is already in localStorage
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

  // Get references to the login form elements
  const loginForm = document.getElementById("login-format");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  // Add an event listener for the form submission
  loginForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Get trimmed values from username and password input fields
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Hide any previous messages and clear their content
    messageDiv.style.display = "none";
    messageDiv.textContent = "";

    // Validate username input
    if (username === "") {
      messageDiv.textContent = "⚠️ Please enter your username.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      usernameInput.focus(); // Set focus back to the username input
      return; // Stop the function execution
    }

    // Validate password input
    if (password === "") {
      messageDiv.textContent = "⚠️ Please enter your password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      passwordInput.focus(); // Set focus back to the password input
      return; // Stop the function execution
    }

    // Get the users data from localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    // Search for a user with matching username and password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    // If no user is found, display an error message
    if (!user) {
      messageDiv.textContent = "❌ Invalid username or password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      return; // Stop the function execution
    }

    // If login is successful, save the logged-in user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Display a success message
    messageDiv.textContent = "✅ Login successful!";
    messageDiv.style.display = "block";
    messageDiv.style.color = "green";

    // Redirect to the index.html page after a short delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
});