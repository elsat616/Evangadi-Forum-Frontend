import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "./login.module.css";
import classess from "./register.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDomR = useRef();
  const passwordDomR = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({});

  const passwordchange = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users", {
        email: emailValue,
        password: passValue,
      });

      localStorage.setItem("token", data.token);
      navigate("/home");
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      alert(error?.response?.data.msg);

      console.log(error.response.data);
    }
  }

  async function handleSubmitR(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDomR.current.value;
    const passValue = passwordDomR.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });

      setTimeout(() => {
        handleRegisterClick();
      });
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
  }

  const loginRef = useRef();

  const handleSignInClick = () => {
    document.getElementById("login").className = "carousel-item";
    document.getElementById("register").className = "carousel-item active";
  };

  const handleRegisterClick = () => {
    document.getElementById("login").className = "carousel-item active";
    document.getElementById("register").className = "carousel-item ";
  };

  return (
    <Layout>
      <div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
        className={classes.login_container}
      >
        {/* className={classes.login_wrapper} */}
        <div className={classes.box}>
          <div id="" className="carousel slide">
            <div className="carousel-inner">
              {/* login */}

              <div id="login" className="carousel-item active ">
                <div className="login">
                  <h3 className={classes.login_title}>Login to your account</h3>

                  <div className={classes.new}>
                    <div>Don't have an account?</div>
                    <div
                      className={classes.create}
                      onClick={handleSignInClick}
                      style={{
                        paddingLeft: "3px",
                        color: "#F04400",
                        cursor: "pointer",
                      }}
                    >
                      Create a new account
                    </div>
                    <div className={classes.newLine}></div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className={classes.login_form_input}
                  >
                    <div>
                      <input
                        className={classes.email}
                        ref={emailDom}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <br />

                    <div>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        // className="p-2 mt-1 form-control"
                        className={classess.password}
                        ref={passwordDom}
                        name="passWord"
                        placeholder="Enter Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />{" "}
                      <i
                        onClick={passwordchange}
                        style={{
                          position: "relative",
                          top: "-35px",
                          left: "85%",
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </i>
                      <br />
                    </div>
                    <button type="submit">Login</button>
                  </form>
                </div>
              </div>

              {/* register */}

              <div id="register" className="carousel-item  ">
                <h1 className={classess.login_title}>Join the network</h1>
                <small>
                  Already have an account?
                  <span
                    onClick={handleRegisterClick}
                    style={{
                      paddingLeft: "3px",
                      color: "#F04400",
                      cursor: "pointer",
                    }}
                  >
                    Sign in
                  </span>
                </small>

                <form
                  onSubmit={handleSubmitR}
                  className={classess.login_form_input}
                >
                  <div className={classess.inputs}>
                    <div>
                      <input
                        className={classess.user}
                        ref={usernameDom}
                        type="text"
                        placeholder="Enter Your username"
                      />
                    </div>
                    <br />
                    <div className={classess.first_last}>
                      <div className={classess.first}>
                        <input
                          ref={firstnameDom}
                          type="text"
                          placeholder="First Name"
                        />
                      </div>

                      <div className={classess.last}>
                        <input
                          ref={lastnameDom}
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <br />
                    <div>
                      <input
                        className={classess.email}
                        ref={emailDomR}
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className={classess.password}
                        ref={passwordDomR}
                        name="passWord"
                        placeholder="Enter Your password"
                      />{" "}
                      <i
                        onClick={passwordchange}
                        style={{
                          position: "relative",
                          top: "-35px",
                          left: "85%",
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </i>
                      <br />
                    </div>
                    <br />
                    <div className={classess.agree2}>
                      <small>
                        I agree to the <Link> privacy policy</Link>
                        <span>and</span> <Link>terms of service.</Link>
                      </small>
                    </div>
                    <button type="submit">Agree and Join</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.Evangadi_description}>
          <div className="padd-text fadeInLeft">
            <small className={classes.title_link}>
              <Link>About</Link>
            </small>
            <h2 className={classes.title_ev}>Evangadi Networks</h2>
            <p className={classes}>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="font-p mg-bt-30">
              Weather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <a href="#" className={classes.how}>
              <button>How it works</button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default login;
