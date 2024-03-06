import React from "react";
import { useContext, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import classes from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "../Questionlist/QuestionList";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axiosBase from "../../axiosConfig";

function Home() {
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = userData.user;
  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/login");
  // }, [isLoggedIn]);
  const Token = localStorage.getItem("token");

  // async function userName() {
  //   try {
  //     const name = await axiosBase.get("/users/check");
  //     console.log(name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   userName();
  // }, []);

  return (
    <Layout>
      <div className={classes.home}>
              <div className={classes.ask_wrapper}>
        <div className={classes.ask}>
          <Link to={"/question"}>
            <button>Ask Question</button>
          </Link>
        </div>
        <h3 className={classes.welcome_username}>
          Welcome: {userData?.data?.username}
          <div className={classes.welcome_line}></div>
        </h3>
      </div>
      <div className={classes.question_header}>
        <h2>Questions</h2>
        <hr />
      </div>
      <QuestionList />
      </div>

    </Layout>
  );
}

export default Home;