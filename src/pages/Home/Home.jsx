import React from "react";
import { useContext, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import classes from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "../Questionlist/QuestionList";
import { UserContext } from "../../component/Dataprovide/DataProvider";

function Home() {
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = !!userData.user;
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);
  const Token = localStorage.getItem("token");

  return (
    <Layout>
      <div className={classes.home_container}>
        {userData.user ? (
          <>
            <div className={classes.ask_wrapper}>
              <Link to={"/question"}>
                <button>Ask Question</button>{" "}
              </Link>
              <div className={classes.question_search}>
                <input type="text" placeholder="Search..." />
              </div>
              <h3 className={classes.welcome_username}>
                Welcome :- {userData.user?.display_name}
              </h3>
            </div>
            <div className={classes.question_header}>
              <h2> Questions </h2>
            </div>
            <QuestionList />
          </>
        ) : null}
      </div>
    </Layout>
  );
}

export default Home;
