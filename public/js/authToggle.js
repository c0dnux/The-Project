import { login } from "./auth.js";
const loginForm = document.querySelector(".form--login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    await login(email, password);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Select all toggle links for switching between login & signup
  const swapAuthLinks = document.querySelectorAll(".swap-auth");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // Attach event listeners to all "Sign Up / Login" links
  swapAuthLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.toggle("d-none");
      signupForm.classList.toggle("d-none");
    });
  });

  // Password toggle functionality
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const passwordField = document.getElementById(
        icon.getAttribute("data-target")
      );
      if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      } else {
        passwordField.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      }
    });
  });
});
