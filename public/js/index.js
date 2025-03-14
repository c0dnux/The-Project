import { logout, auth } from "./auth.js";
import { addToCart } from "./addCart.js";
const logoutBtn = document.querySelector("#logout-btn");
const userSignup = document.getElementById("user-signup");
const cart = document.getElementById("addToCartForm");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await logout();
  });
}
const loginForm = document.querySelector(".form--login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    await auth("login", { email, password });
  });
}
if (userSignup) {
  userSignup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = {
      name: document.getElementById("signup-name").value,
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value,
      phone: document.getElementById("signup-phone").value,
      address: document.getElementById("signup-address").value,
      confirmPassword: document.getElementById("signup-confirm-password").value,
    };

    await auth("signup", form);
  });
}

if (document.querySelector("body")?.dataset.page === "auth") {
  document.addEventListener("DOMContentLoaded", () => {
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
}
if (cart) {
  cart.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      productId: cart.dataset.productId,
      quantity: document.getElementById("product-quantity").value,
    };
    await addToCart(data);
  });
}
