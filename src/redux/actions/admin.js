import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

const localSesion = sessionStorage.getItem("adminId");

function axiosRun(url) {
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

axios.get(`/serverSession/`).then(({ data }) => {
  localSesion === data.session
    ? sessionStorage.setItem("adminLoged", true)
    : sessionStorage.setItem("adminLoged", false);
});

export const fetchLogout = () => () => {
  axios
    .put(`/serverSession/`, {
      session: uuidv4(),
    })
    .then((response) => {
      sessionStorage.setItem("adminId", "");
      sessionStorage.setItem("adminLoged", false);
      removeLoginStatus(0);
    })
    .catch((error) => {
      removeLoginStatus(error);
    });
};

export const fetchLogin = (data) => (dispatch) => {
  sessionStorage.setItem("adminLoged", false);
  const idUserIntro = uuidv4();

  function runValidation() {
    axios
      .put(`/serverSession/`, {
        session: idUserIntro,
      })
      .then((response) => {
        sessionStorage.setItem("adminId", idUserIntro);
        sessionStorage.setItem("adminLoged", true);
        setLoginStatus("The message was sent successfully {" + response + "}");
      })
      .catch((error) => {
        setLoginStatus(error);
      });
  }

  dispatch(checkLogin(data)).then((result) => {
    result
      ? localSesion
        ? axios.get(`/serverSession/`).then(({ data }) => {
            localSesion === data.session
              ? sessionStorage.setItem("adminLoged", true)
              : runValidation();
          })
        : runValidation()
      : alert(
          "Please check your field again \n\n (Password or email is false)"
        );
  });
};

export const checkLogin = (loginData) => (dispatch) => {
  let isAllValid = axiosRun(`/authentication/`).then((data) => {
    return (
      data.email === loginData.Email && data.password === loginData.Password
    );
  });

  return isAllValid;
};

export const getLoginStatus = () => (dispatch) => {
  return sessionStorage.getItem("adminLoged") === "true" ? true : false;
};

export const removeLoginStatus = (typeStatus) => ({
  type: "ADMIN_LOGOUT",
  payload: typeStatus,
});

export const setLoginStatus = (typeStatus) => ({
  type: "ADMIN_LOGIN",
  payload: typeStatus,
});
