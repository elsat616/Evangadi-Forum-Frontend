import React, { useContext } from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo0.png";
import { UserContext } from "../Dataprovide/DataProvider";

function Header() {
  const [userData, setUserData] = useContext(UserContext);

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });
    //resetting localStorage
    localStorage.setItem("token", "");
  };

  return (
    <section>
      <div className={classes.header}>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className={classes.navlist}>
            <p>Home</p>
            <p>How it Works</p>
            <div className={classes.connect_block}>
            <button><a
                className={classes.btn_blue}
                data-panel=".panel-login"
                href="/login"
                onClick={logout}
              >
                {userData.user ? `Log Out` : `Sign In`}
              </a></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
