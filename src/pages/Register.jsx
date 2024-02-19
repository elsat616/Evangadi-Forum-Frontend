import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

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
      alert("register successfull. please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
  }

  return (
    <Layout>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              username:---
              <input ref={usernameDom} type="text" name="userName" />
            </span>
          </div>
          <br />
          <div>
            <span>First name:...</span>
            <input ref={firstnameDom} type="text" name="firstName" />
          </div>
          <br />
          <div>
            <span>Last name:---</span>
            <input ref={lastnameDom} type="text" name="lastName" />
          </div>
          <br />
          <div>
            <span>email:---</span>
            <input ref={emailDom} type="email" name="email" />
          </div>
          <br />

          <div>
            <span>
              password:---
              <input ref={passwordDom} type="password" name="passWord" />
            </span>
            <br />
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Login</Link>
      </section>
    </Layout>
  );
}

export default Register;
