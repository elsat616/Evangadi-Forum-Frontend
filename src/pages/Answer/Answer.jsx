import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "../../pages/Question/question.module.css";
import axiosBase from "../../axiosConfig";
import { FaArrowCircleRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function Answer() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState({});
  const [answers, setAnswer] = useState([]);
  const answerDom = useRef(null);
  const token = localStorage.getItem("token");
  const [like, setlike] = useState(5);
  const [dislike, setdislike] = useState(4);

  const [likeactive, setlikeactive] = useState(false);
  const [dislikeactive, setdislikeactive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function likef() {
    if (likeactive) {
      setlikeactive(false);
      setlike(like - 1);
    } else {
      setlikeactive(true);
      setlike(like + 1);
      if (dislikeactive) {
        setdislikeactive(false);
        setlike(like + 1);
        setdislike(dislike - 1);
      }
    }
  }

  function dislikef() {
    if (dislikeactive) {
      setdislikeactive(false);
      setdislike(like - 1);
    } else {
      setdislikeactive(true);
      setdislike(like + 1);
      if (likeactive) {
        setlikeactive(false);
        setdislike(like + 1);
        setlike(dislike - 1);
      }
    }
  }

  async function getQuestions() {
    try {
      const { data } = await axiosBase.get(`/questions/singleQuestion/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestion(data);

      // console.log(data);
    } catch (error) {}
  }

  async function getAnswer() {
    try {
      const { data } = await axiosBase.get(`/answers/allAnswers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswer(data);
      // console.log(data);
    } catch (error) {}
  }

  useEffect(() => {
    getQuestions();
    getAnswer();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    if (answerDom.current) {
      answerDom.current.value = "";
    }
    if (!answerValue) {
      setErrorMessage("Please set the answer");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
      await axios.post(
        `/answers/postAnswer/${id}`,
        {
          answer: answerValue,
          userid: userData?.user?.id,
          questionid: question?.question?.id, // Fixed typo here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("Thank you for your answer");
      getAnswer();

      // navigate(`/question/${id}`);
    } catch (error) {
      setErrorMessage("your answer not post b/c is more that 100 letter");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className={classes.question_container}>
        <div className={classes.question_wrapper}>
          {question && (
            <div>
              <div className={classes.header}>
                <span className={classes.questi}>QUESTION</span>
              </div>
              <div className={classes.question}>
                <FaArrowCircleRight color="#516CF0" size={30} />
                <h3>
                  {question.title}
                  <div className={classes.line}></div>
                </h3>
              </div>
              <p className={classes.descri}>{question.description}</p>
            </div>
          )}
          <h1 className={classes.community}>Answer From The Community</h1>
          <div className={classes.answer_shadow}>
            {answers.length > 0 &&
              answers.map((aList, i) => {
                return (
                  <div className={classes.Answer_Wrap}>
                    <span className={classes.answer_line}></span>
                    <div className={classes.Answer}>
                      <div className={classes.avatar}>
                        <div>
                          <BsPersonCircle size={60} color="brown" />
                        </div>
                        {aList?.username}
                      </div>
                      <div>{aList?.answer}</div>
                    </div>
                    <div>
                      <span onClick={likef}>
                        <AiFillLike />
                        {like}
                      </span>
                      <span onClick={dislikef}>
                        <AiFillDislike />
                        {dislike}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          <h6 className={classes.answer_question}>Answer The Top Question</h6>
          <div className={classes.question_headtitle2}>
            {errorMessage && (
              <p className={classes.errordisMsg}>{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  rows={4}
                  className={classes.question_description}
                  ref={answerDom}
                  type="text"
                  placeholder=" Write Your Answer Here..."
                />
              </div>

              <button
                className={classes.question_button}
                variant="primary"
                type="submit"
              >
                Post Your Answer
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Answer;
