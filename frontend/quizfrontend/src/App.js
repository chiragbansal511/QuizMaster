import React from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateroute";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    <PrivateRoute />
    </>
  );
}

export default App;
