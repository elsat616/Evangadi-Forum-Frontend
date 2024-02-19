import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo0.png";

function Header() {
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div>
            <ul className={classes.navlist}>
              <li>Home</li>
              <li>How it Works</li>
              <button>Sign Up</button>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Header;
