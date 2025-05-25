document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-format');
    const usernameInput = document.getElementById('username'); // Now using ID
    const passwordInput = document.getElementById('password'); // Now using ID
    const messageDiv = document.getElementById('message'); // Get reference to the message div

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Hide any previous messages
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';

        if (username === '') {
            messageDiv.textContent = "⚠️ Please enter your username.";
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            usernameInput.focus();
            return; // Stop if validation fails
        }

        if (password === '') {
            messageDiv.textContent = "⚠️ Please enter your password.";
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            passwordInput.focus();
            return; // Stop if validation fails
        }

        // If both fields are filled (in a real app, you'd send to server)
        messageDiv.textContent = "✅ Login successful!";
        messageDiv.style.display = 'block';
        messageDiv.style.color = 'green';

        // Simulate a small delay before redirecting for the user to see the success message
        setTimeout(() => {
            window.location.href = "products.html";
        }, 1000); // Redirect after 1 second
    });
});