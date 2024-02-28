// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UserContext } from "../../component/Dataprovide/DataProvider";
// import axios from "../../axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";
// import Layout from "../../component/Layout/Layout";
// import classes from "../../pages/Question/question.module.css";

// function Answer() {
//   const { id } = useParams();
//   console.log(id);
//   const navigate = useNavigate();
//   const [userData, setUserData] = useContext(UserContext);
//   const [question, setQuestion] = useState({});
//   const answerDom = useRef();

//   useEffect(() => {
//     if (!userData.user) navigate("/login");
//   }, [userData.user, navigate]);

//   const token = localStorage.getItem("token");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const answerValue = answerDom.current.value;

//     if (!answerValue) {
//       alert("Please provide information");
//       return;
//     }
//     try {
//       await axios.post(
//         `/answers/postAnswer/${id}`,
//         {
//           answer: answerValue,
//           userid: userData?.user?.id,
//           quesitonid: question?.question?.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Thank you for your answer");
//       navigate("/");
//     } catch (error) {
//       alert("something went wrong!");
//       console.log(error);
//     }
//   }

//   return (
//     <Layout>
//       <div className={classes.question_container}>
//         <div className={classes.question_wrapper}>
//           {question && (
//             <div className={classes.question}>
//               <h3>{question.title}</h3>
//               <p>{question.description}</p>
//             </div>
//           )}
//           <h4>Answer a question</h4>
//           <div className={classes.question_headtitle2}>
//             <form onSubmit={handleSubmit}>
//               <textarea
//                 rows={4}
//                 className={classes.question_description}
//                 ref={answerDom}
//                 type="text"
//                 placeholder="Question Description..."
//               />
//               <span>
//                 <button
//                   className={classes.question_button}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Post Your Question
//                 </button>
//               </span>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Answer;
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "../../pages/Question/question.module.css";

function Answer() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState({});
  const answerDom = useRef();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;

    if (!answerValue) {
      alert("Please provide information");
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
      alert("Thank you for your answer");
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
          {/* {question && (
            <div className={classes.question}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
            </div>
          )} */}
          <h4>Answer a question</h4>
          <div className={classes.question_headtitle2}>
            <form onSubmit={handleSubmit}>
              <textarea
                rows={4}
                className={classes.question_description}
                ref={answerDom}
                type="text"
                placeholder="Question Description..."
              />
              <span>
                <button
                  className={classes.question_button}
                  variant="primary"
                  type="submit"
                >
                  Post Your Answer
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Answer;
