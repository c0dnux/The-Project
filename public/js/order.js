import { showAlert } from "./alert.js";
export const makeOrder = async () => {
  const res = await axios.post("/api/v1/order/makeOrder");
  const checkoutUrl = res.data.checkoutUrl;

  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    showAlert("danger", "Payment initiation failed. No checkout URL received.");
  }
};
