document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const nicknameInput = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('message');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value; // Passwords are not trimmed to allow spaces if desired
        const confirmPassword = confirmPasswordInput.value;

        // Clear any previous messages
        messageDiv.textContent = '';
        messageDiv.style.display = 'none';

        // --- Validation Checks ---

        if (nickname === '') {
            messageDiv.textContent = "⚠️ Please enter a username.";
            messageDiv.style.display = "block";
            messageDiv.style.color = "red";
            nicknameInput.focus();
            return; // Stop execution
        }

        if (password === '') {
            messageDiv.textContent = "⚠️ Please enter a password.";
            messageDiv.style.display = "block";
            messageDiv.style.color = "red";
            passwordInput.focus();
            return; // Stop execution
        }

        if (confirmPassword === '') {
            messageDiv.textContent = "⚠️ Please confirm your password.";
            messageDiv.style.display = "block";
            messageDiv.style.color = "red";
            confirmPasswordInput.focus();
            return; // Stop execution
        }

        if (password !== confirmPassword) {
            messageDiv.textContent = "⚠️ The passwords do not match.";
            messageDiv.style.display = "block";
            messageDiv.style.color = "red";

            // Clear password fields if they don't match
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            passwordInput.focus(); // Focus on the first password field
            return; // Stop execution
        }

        // If all validations pass
        messageDiv.textContent = "✅ Registration completed!";
        messageDiv.style.display = "block";
        messageDiv.style.color = "green";

        // In a real application, you'd send data to a server for registration
        // and only redirect upon successful response.

        // Simulate a small delay before redirecting for the user to see the success message
        setTimeout(() => {
            window.location.href = "login.html"; // Redirect to login page
        }, 1500); // Redirect after 1.5 seconds
    });
});