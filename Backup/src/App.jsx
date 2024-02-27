import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./component/Dataprovide/DataProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import axios from "./axiosConfig";

function App() {
  const [userData, setUserData] = useContext(UserContext);
  const token = localStorage.getItem("token");

  const checkUsers = async () => {
    if (token === null || token === "") {
      localStorage.setItem("token", "");
      token = "";
    } else {
      const userRes = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });

      setUserData({
        token,
        user: {
          id: userRes.data.userid,
          display_name: userRes.data.username,
        },
        config: {
          headers: { Authorization: "Bearer " + token },
        },
      });
    }
  };

  useEffect(() => {
    checkUsers();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
