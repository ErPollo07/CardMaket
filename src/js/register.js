document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const nickname = document.getElementById('nickname').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('message');

  // Check if the passwords match
  if (password !== confirmPassword) {
    messageDiv.textContent = "Passwords do not match";
    messageDiv.style.display = "block";
  } else {
    // If everything is OK
    messageDiv.textContent = "Registration successful!";
    messageDiv.style.display = "block";
  }

  // Reset the form
  document.getElementById('registrationForm').reset();
});