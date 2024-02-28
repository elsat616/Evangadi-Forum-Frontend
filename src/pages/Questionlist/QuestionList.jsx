import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import { BsPersonCircle } from "react-icons/bs";
import classes from "./questionlist.module.css";
import { Link, useNavigate } from "react-router-dom";

function QuestionList() {
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
      const response = await axios.get("/questions", {
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
        question.map((question) => (
          <div className={classes.question}>
            <div key={question.id} className={classes.question_list}>
              <div>
                <h5>
                  <BsPersonCircle size={75} color="#1B92BC" />
                  <br />
                  {question.username}{" "}
                </h5>
              </div>

              <div onClick={() => handleClick(question.id)}>
                {/* <Link to={"/answers"}> */}
                <h3> {question.title}</h3>
                <p> {question.description}</p>
                {/* </Link> */}
              </div>
            </div>
            <div className={classes.answer_wrapper}>
              <h3>answer</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;

// import React, { useEffect, useState, useContext } from "react";
// import axios from "../../axiosConfig";
// import { UserContext } from "../../component/Dataprovide/DataProvider";
// import { BsPersonCircle } from "react-icons/bs";
// import classes from "./questionlist.module.css";
// import { Link, useNavigate } from "react-router-dom";

// function QuestionList() {
//   const [question, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData] = useContext(UserContext);
//   const navigate = useNavigate();
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);

//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/questions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setQuestions(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setIsLoggedIn(false);
//         setError("Unauthorized access. Please log in.");
//       } else {
//         setError("An error occurred. Please try again later.");
//         console.log(error);
//       }
//     }
//   };

//   const handleClick = (questionId) => {
//     setSelectedQuestionId(questionId);
//     navigate(`/question/${questionId}`);
//   };

//   useEffect(() => {
//     fetchQuestions();
//     // Simulate user login
//     setIsLoggedIn(true);
//   }, []);

//   if (!isLoggedIn) {
//     return null; // or redirect to login page
//   }

//   return (
//     <div>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         question.map((question) => (
//           <div className={classes.question}>
//             <div key={question.id} className={classes.question_list}>
//               <div>
//                 <h5>
//                   <BsPersonCircle size={75} color="#1B92BC" />
//                   <br />
//                   {question.username}{" "}
//                 </h5>
//               </div>

//               <div onClick={() => handleClick(question.id)}>
//                 <Link to={`/question/${question.id}`}>
//                   <h3> {question.title}</h3>
//                   <p> {question.description}</p>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default QuestionList;
