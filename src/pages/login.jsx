import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";

function login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

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

      // navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  return (
    <Layout>
      <section>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
      </section>
    </Layout>
  );
}

export default login;
