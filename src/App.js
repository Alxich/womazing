import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  LoadinPage,
  AdminInterface,
  UserInterface,
  LoginPage,
} from "./components";
import { fetchLogout, getLoginStatus } from "./redux/actions/admin";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleChangeAdmin = (logout) => {
    if (logout) {
      setIsAdmin(dispatch(fetchLogout()));
    } else {
      setIsAdmin(dispatch(getLoginStatus()));
    }
  };

  React.useEffect(() => {
    setIsAdmin(dispatch(getLoginStatus()));
  }, [isAdmin]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="container centered page-height">
          <LoadinPage />
        </div>
      ) : (
        <Routes>
          <Route
            exact
            path="/admin/*"
            element={
              !isAdmin ? (
                <LoginPage
                  setIsAdmin={handleChangeAdmin}
                  getLoginStatus={getLoginStatus}
                />
              ) : (
                <AdminInterface
                  setIsAdmin={handleChangeAdmin}
                  dispatch={dispatch}
                />
              )
            }
          />
          <Route
            exact
            path="/*"
            element={<UserInterface />}
            dispatch={dispatch}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
