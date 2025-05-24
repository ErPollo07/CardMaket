document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nickname = document.getElementById('nickname').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('message');

  if (password !== confirmPassword) {
    messageDiv.textContent = "⚠️ The passwords do not match.";
    messageDiv.style.display = "block";
    messageDiv.style.color = "red";

    // Reset solo i campi password
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  } else {
    messageDiv.textContent = "✅ Registration completed!";
    messageDiv.style.display = "block";
    messageDiv.style.color = "green";

    window.location.href = "login.html";
  }
});