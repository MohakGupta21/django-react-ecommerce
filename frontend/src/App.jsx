import { useState } from "react";
import Login from "./views/auth/Login";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Register from "./views/auth/Register";
import Dashboard from "./views/auth/Dashboard";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import StoreHeader from "./views/base/StoreHeader";
import StoreFooter from "./views/base/StoreFooter";
import MainWrapper from "./layout/MainWrapper";
function App() {
  return (
    <>
      <BrowserRouter>
        <StoreHeader />
        {/* <MainWrapper> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-new-password" element={<CreatePassword />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        {/* </MainWrapper> */}

        <StoreFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
