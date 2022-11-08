import React from "react";
import { BackToTop, AdminPanel } from "../../components";
import { Route, Routes } from "react-router-dom";

function Admin({ setIsAdmin, dispatch }) {
  return (
    <>
      <div className="container full-width column centered">
        <div id="scroll-top-behavior" style={{ visibility: "hidden" }}></div>
        <Routes>
          <Route
            exact
            path="/*"
            element={<AdminPanel setIsAdmin={setIsAdmin} dispatch={dispatch} />}
          />
        </Routes>
      </div>
      <BackToTop />
    </>
  );
}

export default Admin;
