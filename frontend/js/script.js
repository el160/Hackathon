// Toggle between Login and Register forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const registerCard = document.getElementById("registerCard");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.parentElement.classList.add("hidden");
  registerCard.classList.remove("hidden");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerCard.classList.add("hidden");
  loginForm.parentElement.classList.remove("hidden");
});
