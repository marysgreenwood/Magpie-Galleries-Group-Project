const signUpFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-input").value.trim();
  const pronouns = document.querySelector("#pronouns-input").value.trim();
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();
  const reqBody = { username, pronouns, email, password };

  console.log("userinput", reqBody);
  if (username && password) {
    const response = await fetch("/api/users/newUser", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
      alert("Account successfully created! Log in below!");
    } else {
      alert("Server not responding");
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signUpFormHandler);
