import { showAlert } from "./alert.js";

export const addToCart = async (data) => {
  try {
    const res = await axios.post("/api/v1/cart/add", data, {
      withCredentials: true,
    });
    if (res.data.status === "Success") {
      console.log(res);

      showAlert("success", "Added to cart");
      window.setTimeout(() => {
        // location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);

    showAlert("danger", err.response.data.message);
  }
};
