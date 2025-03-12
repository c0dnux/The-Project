import { showAlert } from "./alert.js";

export const login = async (email, password) => {
  console.log(email, password);

  try {
    const res = await axios.post(
      "/api/v1/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (res.data.status === "Success") {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);

    showAlert("danger", err.response.data.message);
  }
};
export const logout = async () => {
  try {
    const res = await axios.post("/api/v1/users/logout", {
      withCredentials: true,
    });
    if (res.data.status === "Success") {
      showAlert("success", "Logged Out successfully");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    console.log(err);

    showAlert("danger", "Error logging out! Try again.");
  }
};
//     .updat
