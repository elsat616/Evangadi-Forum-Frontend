import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "./question.module.css";
import { FaArrowCircleRight } from "react-icons/fa";

function Question() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const titleDom = useRef();
  const descriptionDom = useRef();

  // useEffect(() => {
  //   if (!userData.data) navigate("/");
  // }, [userData.user, navigate]);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }
    try {
      await axios.post(
        "/questions/askQuestion",
        {
          title: titleValue,
          description: descriptionValue,
          userid: userData?.user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert("Thank you for your question");
      navigate("/");
    } catch (error) {
      alert("something went wrong!");
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className={classes.question_container}>
        <div className={classes.question_wrapper}>
          <div className={classes.steps}>
            <h3 className={classes.question_headtitle}>
              Steps To Write A Good Question.
              <div className={classes.steps_line}></div>
            </h3>
            <ul className={classes.question_li}>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Summarize your problems in a one-line title.</div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Describe your problem in more detail.</div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>
                  Explain what you have tried and what you expected to happen.
                </div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Review your question and post it to the site.</div>
              </li>
            </ul>
          </div>

          <h4 className={classes.post_your}>Post Your Question</h4>
          <div className={classes.question_headtitle2}>
            <form onSubmit={handleSubmit}>
              <input
                className={classes.question_title}
                ref={titleDom}
                type="text"
                placeholder="Title"
              />
              <textarea
                rows={4}
                className={classes.question_description}
                ref={descriptionDom}
                type="text"
                placeholder="Question Description..."
              />
              <span>
                <button
                  className={classes.question_button}
                  variant="primary"
                  type="submit"
                >
                  Post Your Question
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Question;
