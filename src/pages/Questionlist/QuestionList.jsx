import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { UserContext } from "../../component/Dataprovide/DataProvider";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData] = useContext(UserContext);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/getQuestion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedIn(false);
        setError("Unauthorized access. Please log in.");
      } else {
        setError("An error occurred. Please try again later.");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
    // Simulate user login
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return null; // or redirect to login page
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        questions.map((question) => (
          <div key={question.id}>
            <h3>Username: {question.username}</h3>
            <p>Question: {question.question}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;
