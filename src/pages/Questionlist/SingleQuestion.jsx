import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import classes from "./questionlist.module.css";

function SingleQuestion({ question }) {
  return (
    <div className={classes.question}>
      <div className={classes.question_list}>
        <div>
          <h5>
            <BsPersonCircle size={75} color="#1B92BC" />
            <br />
            {question.username}{" "}
          </h5>
        </div>

        <div>
          <h3>{question.title}</h3>
          <p>{question.description}</p>
        </div>
      </div>
      <div className={classes.answer_wrapper}>
        <h3>Answers</h3>
      </div>
    </div>
  );
}

export default SingleQuestion;
