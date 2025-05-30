async function getUsers() {
  // Fetches user data from a local JSON file.
  const users = await fetch("../data/users.json");
  // Parses the JSON response and returns the data.
  return await users.json();
}

document.addEventListener("DOMContentLoaded", function () {
  // Checks if user data exists in localStorage.
  if (!localStorage.getItem("users")) {
    // If users are not in localStorage, fetches them and stores them.
    getUsers()
      .then((data) => {
        localStorage.setItem("users", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  // Gets references to the registration form elements.
  const registrationForm = document.getElementById("registrationForm");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const messageDiv = document.getElementById("message");
  const privacyCheckbox = document.getElementById("privacy");
  const privacyMessage = document.getElementById("privacy-message");

  // Adds an event listener for the form submission.
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission behavior.

    // Gets the trimmed values for nickname, and raw values for passwords.
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Clears any previous messages and hides the message div.
    messageDiv.textContent = "";
    messageDiv.style.display = "none";
    privacyMessage.textContent = "";
    privacyMessage.style.display = "none";

    // --- Validation Checks ---

    // Validates if the nickname input is empty.
    if (nickname === "") {
      messageDiv.textContent = "⚠️ Please enter a username.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      nicknameInput.focus();
      return; // Stops function execution.
    }

    // Validates if the password input is empty.
    if (password === "") {
      messageDiv.textContent = "⚠️ Please enter a password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      passwordInput.focus();
      return; // Stops function execution.
    }

    // Validates if the confirm password input is empty.
    if (confirmPassword === "") {
      messageDiv.textContent = "⚠️ Please confirm your password.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      confirmPasswordInput.focus();
      return; // Stops function execution.
    }

    // Validates if the password and confirm password do not match.
    if (password !== confirmPassword) {
      messageDiv.textContent = "⚠️ The passwords do not match.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";

      // Clears password fields if they don't match.
      passwordInput.value = "";
      confirmPasswordInput.value = "";
      passwordInput.focus(); // Focuses on the first password field.
      return; // Stops function execution.
    }

    // Validates if the privacy checkbox is not checked.
    if (!privacyCheckbox.checked) {
      privacyMessage.textContent = "⚠️ You must accept the Privacy Policy.";
      privacyMessage.style.display = "block";
      privacyMessage.style.color = "red";
      privacyCheckbox.focus();
      return;
    }

    // Retrieves existing users from localStorage.
    let users = JSON.parse(localStorage.getItem("users"));
    console.log("Current users:", users);

    // Checks if a user with the entered nickname already exists.
    const userExists = users.find((user) => user.username === nickname);

    // If the username is already taken, displays an error message.
    if (userExists) {
      messageDiv.textContent = "⚠️ This username is already taken.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
      nicknameInput.focus();
      return; // Stops function execution.
    }

    // Adds the new user to the users array with an empty cart.
    users.push({
      username: nickname,
      password: password,
      cart: [],
    });

    // Saves the updated users array back to localStorage.
    localStorage.setItem("users", JSON.stringify(users));

    // If all validations pass, displays a success message.
    messageDiv.textContent = "✅ Registration completed!";
    messageDiv.style.display = "block";
    messageDiv.style.color = "green";

    // Simulates a small delay before redirecting for the user to see the success message.
    setTimeout(() => {
      window.location.href = "login.html"; // Redirects to the login page.
    }, 1500); // Redirects after 1.5 seconds.
  });
});