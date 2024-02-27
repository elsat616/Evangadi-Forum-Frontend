import React from "react";
import { useContext, useState, useEffect } from "react";
// import { AppState } from "../../App";
import Layout from "../../component/Layout/Layout";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import { UserContext } from "../../component/Dataprovide/DataProvider";

function Home() {
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = !!userData.user;

  useEffect(() => {
    //   if (!userData.user) {
    //     navigate("/login");
    //   }
    // }, [userData.user]);
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);
  const authToken = localStorage.getItem("authtoken");
  return (
    <Layout>
      {userData.user ? (
        <div className={classes.home_container}>
          <div className={classes.ask_wrapper}>
            <button>Ask Question</button>
            <div className={classes.question_search}>
              <input type="text" placeholder="Search..." />
            </div>
            {/* <h2 className={classes.welcome_username}>Welcome: {userData.user.username}</h2> */}
            <h3>Welcome :- {userData.user?.display_name}</h3>
          </div>
          <div className={classes.question}>
            <div className={classes.question_header}>
            {/* <Link to={"/question"} className="ask">
              <h2>Questions</h2>
              {" "}
							</Link> */}
              <button>All</button>
              <button>React</button>
              <button>git</button>
              <button>sql</button>
              <button>javascript</button>
              <button>Bootstrap</button>
              <button>Node.js</button>
              <button>CSS</button>
            </div>
          </div>
          <Dashboard />
        </div>
      ) : null}
    </Layout>
  );
}

export default Home;
