const registerUrl = "https://api.noroff.dev/api/v1/social/auth/register";

const registerUsername = document.getElementById("username");

const registerEmail = document.getElementById("email");
console.log("email", registerEmail);
const registerPassword = document.getElementById("password2");
console.log("password", registerPassword);

const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

/**
 * Register a user with a API POST request
 *
 * Data from register form
 *
 * If registration is successfull user is sent to login form
 */
async function registerUser(event) {
  event.preventDefault();
  const name = registerUsername.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  const user = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
  };
  const postData = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const registerResponse = await fetch(registerUrl, postData);
    const json = await registerResponse.json();
    console.log("json", json);
    if (registerResponse.ok === true) {
      window.location.reload();
    } else {
      registerError.innerHTML = `${json.errors[0].message}`;
      setTimeout(function () {
        registerError.innerHTML = "";
      }, 5000);
    }
  } catch (error) {
    console.log("Dette et feil", error);
  }
}

registerForm.addEventListener("submit", registerUser);
