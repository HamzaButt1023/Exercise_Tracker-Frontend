import React, { useState,useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Addactivity from "./components/Addactivity";
import Home from "./components/Home";

import Reset from "./components/Reset";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import { useSelector } from "react-redux";
import Editactivity from "./components/Editactivity";
function App() {

  let [dogImage, setDogImage] = useState(null)
  const authKe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZDQwZGU0MmQxN2NlMTg1MTgwNWEwIn0sImlhdCI6MTY3MjI5ODcxOH0.ry-amUwpBCE2diSmuiL9yJrKYwTvJbkl2kuMeXk-xzA";
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedin);
  const loginPage = <Navigate to="/" replace={true} />;
  const homePage = <Navigate to="/home" replace={true} />;

  // Qazwsxcd
  return (
    
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={isLoggedIn ? <Home /> : (loginPage)} />
          <Route path="/add-activity" element={isLoggedIn ? <Addactivity /> : (loginPage)} />
          <Route path="/edit-activity/:id" element={isLoggedIn ? <Editactivity /> : (loginPage)} />
          <Route path="/" element={!isLoggedIn ? <Signin /> : (homePage)} />
          <Route path="/become-a-member" element={!isLoggedIn ? <Signup /> : (homePage)} />
          <Route path="/lost-password" element={!isLoggedIn ? <Reset /> : (homePage)} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;