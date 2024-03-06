import React from "react";
import { useContext, useEffect ,useState} from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
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

        <div className={classes.question_search}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        <h3 className={classes.welcome_username}>
          Welcome: {userData?.data?.username}
          {/* <div className={classes.welcome_line}></div> */}
        </h3>
      </div>
      <div className={classes.question_header}>
        <h2>Questions</h2>
        <hr />
      </div>
      <QuestionList searchQuery={searchQuery} />
      </div>

    </Layout>
  );
}

export default Home;
