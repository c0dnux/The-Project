import { showAlert } from "./alert.js";

export const addToCart = async (data) => {
  try {
    const res = await axios.post("/api/v1/cart/add", data, {
      withCredentials: true,
    });
    if (res.data.status === "Success") {
      showAlert("success", "Added to cart");
      window.setTimeout(() => {
        location.assign("/cart");
      }, 1500);
    }
  } catch (err) {
    showAlert("danger", err.response.data.message);
  }
};

export const removeProduct = async (myProductId) => {
  try {
    const res = await axios.patch("/api/v1/cart/remove", {
      productId: myProductId,
    });

    if (res.data.status === "Success") {
      showAlert("success", "Removed from cart");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    console.log(error);

    showAlert("danger", error.response.data.message);
  }
};
