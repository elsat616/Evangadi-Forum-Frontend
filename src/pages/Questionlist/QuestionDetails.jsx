import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";

function QuestionDetails() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/questions/${questionId}`);
      if (response.status === 200) {
        setQuestion(response.data);
      } else {
        console.error("Failed to fetch question");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  return (
    <div>
      {question ? (
        <div>
          <h2>{question.title}</h2>
          <p>{question.body}</p>
        </div>
      ) : (
        <div>
        <h2>{question.title}</h2>
        <p>{question.body}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionDetails;
