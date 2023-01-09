const loginFromHandler = async (event) => {
    // Prevents page from refreshing
    event.preventDefault();

    // Grab username and password from the form
    const username = document.querySelector('#username-login').Value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {

        // If username & password are present, then send post request with them to log in
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

document.querySelector('login-form').addEventListener('submit', loginFromHandler);