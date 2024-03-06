import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import classes from "./questionlist.module.css";
import { Link, useNavigate } from "react-router-dom";

function QuestionList({ searchQuery }) {
  const [question, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();

  function handleClick(questionid) {
    navigate(`/question/${questionid}`);
  }

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/allQuestion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response && error?.response?.status === 401) {
        setIsLoggedIn(false);
        setError("Unauthorized access. Please log in.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return null; // or redirect to login page
  }

  // Filter the questions based on the search query
  const filteredQuestions = question.filter(
    (question) =>
      question.title &&
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={classes.question_list1}>
      {filteredQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        filteredQuestions.map((question) => (
          <div
            onClick={() => handleClick(question.id)}
            className={classes.question}
            key={question.id}
          >
            <div className={classes.question_list}>
              <div className={classes.avatar}>
                <BsPersonCircle size={60} color="#1B92BC" />
                <h5>{question.username}</h5>
              </div>

              <div>
                <p>{question.title}</p>
              </div>
              <div className={classes.arrow}>
                <IoIosArrowForward />
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;