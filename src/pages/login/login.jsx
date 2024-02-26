import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "./login.module.css";

function login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successfull.");
      localStorage.setItem("token", data.token);
      navigate("/");

      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <Layout>
      <div
        style={{
          backgroundImage: "url('../../assets/bg-svg-f.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
        className={classes.login_container}
      >
        <div className={classes.login_wrapper}>
          <div className={classes.login_form}>
            <form onSubmit={handleSubmit} className={classes.login_form_input}>
              <h3 className={classes.login_title}>Login to your account</h3>
              <small>Don’t have an account? </small>
              <Link to="/register">
                <small>Create a new account</small>
              </Link>
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
                  className={classes.password}
                  ref={passwordDom}
                  type="password"
                  name="passWord"
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>

        <div className={classes.Evangadi_description}>
          <div className="padd-text fadeInLeft">
            <Link>
              <small className={classes.title_link}>About</small>
            </Link>
            <h2 className={classes.title}>Evangadi Networks</h2>
            <p className={classes}>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="font-p mg-bt-30">
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <a href="/explained/" className="btn btn-blue">
              How it works
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default login;
