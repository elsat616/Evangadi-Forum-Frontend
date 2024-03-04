import React, { useContext } from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo0.png";
import { UserContext } from "../Dataprovide/DataProvider";

function Header() {
  const [userData, setUserData] = useContext(UserContext);
  // console.log(userData);
  async function logout() {
    //set global state to undefined will logout the user

    try {
      setUserData({
        userData: "",
      });
      //resetting localStorage
      localStorage.setItem("", "");
      // console.log(userData, "uuuuuuuuuu");
      s;
      userData.data.token = "";
      userData.user = "";
      userData.config = "";
    } catch (error) {
      console.log(error.message);
    }
  }

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
            <div className={classes.link}>
              <div>Home</div>
              <div>How it Works</div>
            </div>

            <div className={classes.connect_block}>
              <button>
                <Link
                  className={classes.btn_blue}
                  data-panel=".panel-login"
                  to="/login"
                  onClick={logout}>
                  {userData?.data ? `Log Out` : `Sign In`}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
