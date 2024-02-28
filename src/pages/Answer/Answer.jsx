import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";

function Answer({ questionid }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Fetch the question and answers
    fetchQuestion();
    fetchAnswers();
  }, [questionid]);

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `questions/singleQuestion/${questionid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Question response:", response);
      setQuestion(response.data);
    } catch (error) {
      console.log("Error fetching question:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`answers/allAnswers/${questionid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Answers response:", response);
      setAnswers(response.data);
    } catch (error) {
      console.log("Error fetching answers:", error);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `answers/postAnswer/${questionid}`,
        {
          questionid,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer("");
      setSuccess(true);
      console.log(response.data); // Optional: Handle the response as desired
      fetchAnswers(); // Fetch the updated answers after submitting a new answer
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  if (question === null) {
    return (
      <Layout>
        <div>
          <p>Loading question...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h2>Question:</h2>
        <h3>{question.title}</h3>
        <p>{question.description}</p>
        <h2>Answer the Question:</h2>
        <form onSubmit={handleSubmitAnswer}>
          <textarea
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Write your answer here..."
            required
          ></textarea>
          <button type="submit">Submit Answer</button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>Answer submitted successfully!</p>}
        <h3>Answers:</h3>
        {answers.map((answer) => (
          <div key={answer.id}>
            <p>{answer.answer}</p>
            <p>By: {answer.username}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Answer;
