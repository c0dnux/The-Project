import { showAlert } from "./alert.js";

export const addToCart = async (data) => {
  try {
    const res = await axios.post("/api/v1/cart/add", data, {
      withCredentials: true,
    });
    if (res.data.status === "Success") {

      showAlert("success", "Added to cart","cart");
      window.setTimeout(() => {
        // location.assign("/");
      }, 1500);
    }
  } catch (err) {

    showAlert("danger", err.response.data.message,"cart");
  }
};
