// import React, { useEffect, useState, createContext } from "react";
// import Home from "./pages/Home/Home";
// import LogIn from "./pages/login/login";
// import Register from "./pages/Register/Register";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";
// import axios from "./axiosConfig";

// export const AppState = createContext();

// function App() {
//   const [user, setUser] = useState({});
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   async function checkUser() {
//     try {
//       const { data } = await axios.get("/users/check", {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setUser(data);
//     } catch (error) {
//       console.log(error.response);
//       navigate("/login");
//     }
//   }

//   useEffect(() => {
//     checkUser();
//   }, []);

//   return (
//     <Router>
//       <AppState.Provider value={{ user, setUser }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LogIn />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </AppState.Provider>
//     </Router>
//   );
// }

// export default App;