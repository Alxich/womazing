const initailState = {
  loginStatus: sessionStorage.getItem("adminLoged"),
  isLoaded: false,
};

const adminLogin = (state = initailState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        loginStatus: action.payload,
        isLoaded: true,
      };

    case "ADMIN_LOGOUT":
      return {
        ...state,
        loginStatus: action.payload,
        isLoaded: false,
      };

    case "ADMIN_LOGIN_STATUS":
      return {
        ...state.loginStatus,
      };

    default: {
      return state;
    }
  }
};

export default adminLogin;
