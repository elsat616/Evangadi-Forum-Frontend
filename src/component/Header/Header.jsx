import React, { useContext, useEffect } from "react";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo0.png";
import { UserContext } from "../Dataprovide/DataProvider";

function Header() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.1)", // Set your desired z-index value
  };
  // console.log(userData);
  // useEffect(() => {
  //   if (!userData.data) {
  //     navigate("/login");
  //   } else {
  //     navigate("/home");
  //   }
  // }, [userData.user, navigate]);
  async function logout() {
    //set global state to undefined will logout the user
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary header py-4"
      style={headerStyle}
      bg="light"
      expand="lg"
    >
      <div className="container-fluid">
        <div className={classes.logo_container}>
          <Link to="/home" className="navbar-brand" href="#">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                How it Works
              </a>
            </li>
            <div className={classes.connect_block}>
              <button>
                <Link
                  className={classes.btn_blue}
                  data-panel=".panel-login"
                  to="/login"
                  onClick={logout}
                >
                  {userData?.data ? `Log Out` : `Sign In`}
                </Link>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
