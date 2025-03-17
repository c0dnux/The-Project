const $c67cb762f0198593$export$de026b00723010c1 = (type, msg)=>{
    $c67cb762f0198593$export$516836c6a9dfc573(); // Remove existing alert before showing a new one
    // Bootstrap alert classes: 'alert-success', 'alert-danger', etc.
    const markup = `
      <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x shadow" role="alert" style="z-index: 1050;">
        ${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    // const data = from === "cart" ? "#header" : "body";
    document.querySelector("#header").insertAdjacentHTML("afterbegin", markup);
    // Auto-hide after 5 seconds
    window.setTimeout($c67cb762f0198593$export$516836c6a9dfc573, 5000);
};
const $c67cb762f0198593$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) {
        el.classList.remove("show"); // Hide alert smoothly
        setTimeout(()=>el.remove(), 150); // Remove it after animation
    }
};


const $0e0246aa17379d59$export$73693bad9f5880b0 = async (type, data)=>{
    const url = type === "login" ? "/api/v1/users/login" : "/api/v1/users/signup";
    try {
        const res = await axios.post(url, data, {
            withCredentials: true
        });
        if (res.data.status === "Success") {
            (0, $c67cb762f0198593$export$de026b00723010c1)("success", "Logged in successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)("danger", err.response.data.message);
    }
};
const $0e0246aa17379d59$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios.post("/api/v1/users/logout", {
            withCredentials: true
        });
        if (res.data.status === "Success") {
            (0, $c67cb762f0198593$export$de026b00723010c1)("success", "Logged Out successfully");
            window.setTimeout(()=>{
                location.reload(true);
            }, 1500);
        }
    } catch (err) {
        console.log(err);
        (0, $c67cb762f0198593$export$de026b00723010c1)("danger", "Error logging out! Try again.");
    }
}; //     .updat



const $36691fe5aa208e75$export$576b6dd9d68b37bc = async (data)=>{
    try {
        const res = await axios.post("/api/v1/cart/add", data, {
            withCredentials: true
        });
        if (res.data.status === "Success") {
            (0, $c67cb762f0198593$export$de026b00723010c1)("success", "Added to cart");
            window.setTimeout(()=>{
                location.assign("/cart");
            }, 1500);
        }
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)("danger", err.response.data.message);
    }
};
const $36691fe5aa208e75$export$86a330d9a979afdd = async (myProductId)=>{
    try {
        const res = await axios.patch("/api/v1/cart/remove", {
            productId: myProductId
        });
        if (res.data.status === "Success") {
            (0, $c67cb762f0198593$export$de026b00723010c1)("success", "Removed from cart");
            window.setTimeout(()=>{
                location.reload(true);
            }, 1500);
        }
    } catch (error) {
        console.log(error);
        (0, $c67cb762f0198593$export$de026b00723010c1)("danger", error.response.data.message);
    }
};



const $e01ee04c3b6f960b$export$7f840fa987fe1d8d = async ()=>{
    const res = await axios.post("/api/v1/order/makeOrder");
    const checkoutUrl = res.data.checkoutUrl;
    if (checkoutUrl) window.location.href = checkoutUrl;
    else (0, $c67cb762f0198593$export$de026b00723010c1)("danger", "Payment initiation failed. No checkout URL received.");
};


const $d0f7ce18c37ad6f6$var$logoutBtn = document.querySelector("#logout-btn");
const $d0f7ce18c37ad6f6$var$userSignup = document.getElementById("user-signup");
const $d0f7ce18c37ad6f6$var$cart = document.getElementById("addToCartForm");
const $d0f7ce18c37ad6f6$var$removeFromCart = document.querySelectorAll(".romove-from-cart");
const $d0f7ce18c37ad6f6$var$order = document.getElementById("checkout-btn");
if ($d0f7ce18c37ad6f6$var$logoutBtn) $d0f7ce18c37ad6f6$var$logoutBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    await (0, $0e0246aa17379d59$export$a0973bcfe11b05c9)();
});
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form--login");
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    await (0, $0e0246aa17379d59$export$73693bad9f5880b0)("login", {
        email: email,
        password: password
    });
});
if ($d0f7ce18c37ad6f6$var$userSignup) $d0f7ce18c37ad6f6$var$userSignup.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const form = {
        name: document.getElementById("signup-name").value,
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
        phone: document.getElementById("signup-phone").value,
        address: document.getElementById("signup-address").value,
        confirmPassword: document.getElementById("signup-confirm-password").value
    };
    await (0, $0e0246aa17379d59$export$73693bad9f5880b0)("signup", form);
});
if (document.querySelector("form")?.dataset.page === "auth") document.addEventListener("DOMContentLoaded", ()=>{
    // Password toggle functionality
    document.querySelectorAll(".toggle-password").forEach((icon)=>{
        icon.addEventListener("click", ()=>{
            const passwordField = document.getElementById(icon.getAttribute("data-target"));
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
if ($d0f7ce18c37ad6f6$var$cart) $d0f7ce18c37ad6f6$var$cart.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = {
        productId: $d0f7ce18c37ad6f6$var$cart.dataset.productId,
        quantity: document.getElementById("product-quantity").value
    };
    await (0, $36691fe5aa208e75$export$576b6dd9d68b37bc)(data);
});
if ($d0f7ce18c37ad6f6$var$removeFromCart) $d0f7ce18c37ad6f6$var$removeFromCart.forEach((button)=>{
    button.addEventListener("click", async (e)=>{
        e.preventDefault();
        const productId = button.getAttribute("data-id");
        await (0, $36691fe5aa208e75$export$86a330d9a979afdd)(productId);
    });
});
if ($d0f7ce18c37ad6f6$var$order) $d0f7ce18c37ad6f6$var$order.addEventListener("click", async (e)=>{
    e.preventDefault();
    $d0f7ce18c37ad6f6$var$order.innerText = "Processing...";
    $d0f7ce18c37ad6f6$var$order.disabled = true; // Prevent multiple clicks
    try {
        await (0, $e01ee04c3b6f960b$export$7f840fa987fe1d8d)(); // Call your order function
        $d0f7ce18c37ad6f6$var$order.innerText = "Done"; // Reset text after success
    } catch (error) {
        $d0f7ce18c37ad6f6$var$order.innerText = "Try Again"; // Indicate failure
    } finally{
        $d0f7ce18c37ad6f6$var$order.disabled = false; // Re-enable button
    }
});


//# sourceMappingURL=index.js.map
