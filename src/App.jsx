import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./component/Dataprovide/DataProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import axios from "./axiosConfig";
import Question from "./pages/Question/Question";
import Register from "./pages/Register/Register";
import Answer from "./pages/Answer/Answer";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkUser = async () => {
    let token = localStorage.getItem("token");
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
    checkUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/:id" element={<Answer />} />
      </Routes>
    </Router>
  );
}

export default App;
