const loginFromHandler = async (event) => {
    // Prevents page from refreshing
    event.preventDefault();

    // Grab username and password from the form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {

        // If username & password are present, then send post request with them to log in
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/');
            console.log (session.logged_in);
        } else {
            alert('Failed to log in');
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFromHandler);