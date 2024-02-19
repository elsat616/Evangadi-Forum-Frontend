import React from "react";
import classes from "./footer.module.css";
import logo from '../images/logo.png';

function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.footer_out_container}>
          <div className={classes.footer_inner_container}>
            <div className={classes.footer_data}>
              <div>
              <img src={logo} />
              </div>
              <div>
                <h3>Useful Link</h3>
                <ul>
                  <li>How it works</li>
                  <li>Terms of Service</li>
                  <li>Privacy policy</li>
                </ul>
              </div>
              <div>
                <h3>Contact Info</h3>
                <ul>
                  <li>Contact Info</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.copy_write}>&copy; 2010-2024, Evangadi.com</div>
      </div>
    </>
  );
}

export default Footer;
