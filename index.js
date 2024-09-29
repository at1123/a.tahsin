function login() {
    // Retrieve input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Correct credentials
    var correctUsername = '10';
    var correctPassword = '12023';

    // Check credentials
    if (username === correctUsername && password === correctPassword) {
        // Redirect to another page if credentials are correct
        window.location.href = 'index1.html';
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('error-message').textContent = 'Invalid username or password. Please try again.';
    }
}
