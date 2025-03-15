export const showAlert = (type, msg) => {
  hideAlert(); // Remove existing alert before showing a new one

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
  window.setTimeout(hideAlert, 5000);
};

export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.classList.remove("show"); // Hide alert smoothly
    setTimeout(() => el.remove(), 150); // Remove it after animation
  }
};
