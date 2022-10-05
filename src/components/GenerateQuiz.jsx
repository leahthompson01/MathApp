import { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import Lobby from "./Lobby";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../context/socket";

export default function GenerateQuiz() {
  const socket = useContext(SocketContext);
  const location = useLocation();
  // const url = "https://cryptic-brook-96547.herokuapp.com/quiz";
  const { operation, joiningQuiz, lobbyCode, currentUser, creatingQuiz } =
    location.state;
  //
  console.log(creatingQuiz);
  const [newUser, setNewUser] = useState("");
  // console.log('lobby code',lobbyCode)

  const [questions, setQuestions] = useState([
    { question: "", rightAnswer: "", operand: "", answerChoices: {} },
  ]);
  const [response, setResponse] = useState("");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [onMessage, setOnMessage] = useState("");
  const [userLeft, setUserLeft] = useState("false");
  const [triggeredQuizStart, setTriggeredQuizStart] = useState(false);
  const [indexCorrectAnswers, setIndexCorrectAnswers] = useState([]);
  // useEffect(() => {
  // console.log("setting on Message", socket._callbacks?.["$message"]);
  // if (socket._callbacks?.["$message"] == undefined) {
  socket.on("message", (msg) => {
    // setMsg(msg);
    // console.log("this is msg" + msg);
    let strArr = msg.split(" ");
    console.log("message ", strArr);
    if (strArr.length <= 2) {
      // setResponse(msg.slice(7, msg.length - 1));
      console.log("msg", msg);
      setResponse(msg);
    } else if (strArr.includes("joined")) {
      setNewUser(msg.split(" ")[0]);
    } else if (strArr.includes("left")) {
      setUserLeft("true");
    }

    // console.log("all have submitted " + msg);
    // console.log(strArr[strArr.length - 1].join(""));
    // const newArr = strArr[1].split(",").map((str) => str.split(":"));

    // console.log("newArr: " + newArr);
    // }
  });
  console.log("response", response);
  // }
  // }, [joiningQuiz, creatingQuiz]);
  if (socket._callbacks?.["$all_submit"] == undefined) {
    socket.on("all_submit", (data) => {
      console.log("data", data);
      setResults(data.split(",").map((el) => el.split(":")));
    });
  }
  console.log("all submit", socket._callbacks?.["all_submit"]);
  console.log("blank quiz", socket._callbacks?.["$blank_quiz"]);
  if (socket._callbacks?.["$blank_quiz"] == undefined) {
    socket.on("blank_quiz", () => {
      socket.emit("quiz_start", {
        msg: response.split(" ")[1],
        quiz: questions,
      });
    });
  }
  // socket.on("message", (msg) => {
  //   let strArr = msg.split(" ");
  //   console.log("message " + msg);
  //   if (strArr.length <= 2) {
  //     // setResponse(msg.slice(7, msg.length - 1));
  //     setResponse(msg);
  //   } else if (strArr.includes("joined")) {
  //     setNewUser(msg.split(" ")[0]);
  //   } else if (strArr.includes("left")) {
  //     setUserLeft("true");
  //   } else if (strArr.includes("all")) {
  //     console.log("all have submitted " + msg);
  //     console.log(strArr[strArr.length - 1].join(""));
  //     // const newArr = strArr[1].split(",").map((str) => str.split(":"));

  //     // console.log("newArr: " + newArr);
  //     // setResults(newArr);
  //   }
  // });
  // console.log("new user? " + newUser);
  //  console.log('this is response', response)
  //  console.log('lobby code ' + updatedLobby)
  //  useEffect(() =>
  //  setUpdatedLobby(prevValue => response.split('')[1])
  //  ,[response])
  let url;
  if (joiningQuiz == true) {
    url = `http://localhost:8000/joinquiz/${lobbyCode}`;
  } else if (operation !== undefined) {
    url = "http://localhost:8000/quiz/" + operation.toLowerCase();
  }
  useEffect(() => {
    async function getQuestionData() {
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        // console.log(data)
        //  console.log( data.forEach(obj => obj = JSON.parse(obj)))
        // const newData = await data.forEach(obj => console.log(JSON.parse(obj)))
        // console.log(newData)
        if (url == `http://localhost:8000/joinquiz/${lobbyCode}`) {
          setQuestions(data);
          const resp2 = await fetch(`http://localhost:8000/users/${lobbyCode}`);
          const allUsers = await resp2.json();
          setUsers(allUsers);
        } else {
          setQuestions(data.map((el) => JSON.parse(el)));
          let lobbyCodeStr = response.split(" ")[1];
          if (
            (response !== undefined || response.split(" ").length >= 2) &&
            lobbyCodeStr !== undefined
          ) {
            // console.log("this is the lobbyCode " + lobbyCodeStr);
            const resp3 = await fetch(
              `http://localhost:8000/users/${lobbyCodeStr}`
            );
            const otherUsers = await resp3.json();
            // console.log("otherUsers " + otherUsers);
            setUsers(otherUsers);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    getQuestionData();
  }, [response, lobbyCode]);

  useEffect(() => {
    let lobbyCodeStr = response.split(" ")[1];
    async function refetch() {
      try {
        if (
          (response !== undefined || response.split(" ").length >= 2) &&
          lobbyCodeStr !== undefined
        ) {
          // console.log("this is the lobbyCode " + lobbyCodeStr);
          const resp3 = await fetch(
            `http://localhost:8000/users/${lobbyCodeStr}`
          );
          const otherUsers = await resp3.json();
          // console.log("otherUsers " + otherUsers);
          setUsers(otherUsers);
        }
      } catch (err) {
        console.log(err);
      }
    }
    refetch();
  }, [newUser]);
  useEffect(() => {
    // if (socket._callbacks?.["$all_submit"] == undefined) {
    if (response != " " && response !== undefined && response !== "") {
      // if (!isSubmitted) {
      // setTriggeredQuizStart(true);
      socket.emit("quiz_start", {
        msg: response.split(" ")[1],
        quiz: questions,
      });
    }
    // }
  }, [questions]);
  // }
  // }, [questions]);
  // }, [response, newUser,]);
  // if (response != " " && response !== undefined && response !== "") {
  //   if (!isSubmitted) {
  //     socket.emit("quiz_start", {
  //       msg: response.split(" ")[1],
  //       quiz: questions,
  //     });
  //   }
  // }

  function decreaseIndex() {
    setIndex((prevIndex) => {
      if (prevIndex !== 0) {
        return prevIndex - 1;
      } else {
        return 0;
      }
    });
  }
  function increaseIndex() {
    setIndex((prevIndex) => {
      if (prevIndex !== questions.length - 1) {
        return prevIndex + 1;
      } else {
        return questions.length - 1;
      }
    });
  }
  function selectAnswer(event) {
    if (!isSubmitted) {
      const value = event.target.innerText;
      // let indx = index
      setAnswers((prevObj) => {
        // let indx = index
        prevObj[index] = value;
        return {
          ...prevObj,
        };
      });
    }
  }

  function submitQuiz() {
    setSubmitted(true);

    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] && answers[i] == questions[i].rightAnswer) {
        count++;
        setIndexCorrectAnswers((prevArr) => [...prevArr, i]);
      }
    }
    // console.log(answers);
    setScore(count);
    // console.log(score);
    // console.log(count);
    if (lobbyCode !== undefined && lobbyCode !== "") {
      socket.emit("submit_quiz", {
        lobbyCode: lobbyCode,
        username: currentUser,
        score: count,
      });
    } else if (response !== undefined && response !== "") {
      socket.emit("submit_quiz", {
        lobbyCode: response.split(" ")[1],
        username: currentUser,
        score: count,
      });
    }
  }
  // console.log(indexCorrectAnswers);
  // console.log(answers);
  // console.log(questions);
  // console.log(questions[0]);
  // useEffect(() => {
  //   async function getUsers() {
  //     try {
  //       console.log("updated Lobby code" + lobbyCode);
  //       if (updatedLobby !== undefined) {
  //         const resp = await fetch(`http://localhost:5000/users/${lobbyCode}`);
  //         const users = await resp.json();
  //         setUsers(users);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getUsers();
  //   setUpdatedLobby(lobbyCode);
  //   console.log("updated Lobby code" + lobbyCode);
  // }, [newUser]);
  console.log("this is results ", results);
  console.log(results[0]);
  return (
    <>
      <section className="quizPage">
        <Lobby
          message={response.split(" ")}
          users={users}
          currentLobby={lobbyCode}
          newUser={newUser}
          currentUser={currentUser}
        />
        {(results[0] == "" || results[0] == undefined) && (
          <section className="quizSection">
            {questions.length <= 1 ? (
              <img
                className="loadingGif"
                src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif"
              ></img>
            ) : (
              <div className="questionsContainer">
                {isSubmitted && <p className="score">Your Score is {score}</p>}
                <h2>{questions[index].question}</h2>

                <section className="middleContainer">
                  <section className="answerChoices">
                    {Object.keys(questions[index].answerChoices)
                      .sort(
                        (a, b) =>
                          questions[index].answerChoices[a] -
                          questions[index].answerChoices[b]
                      )
                      .map((answerOptions) => (
                        <p
                          key={uuid()}
                          onClick={selectAnswer}
                          className={
                            answers[index] ==
                            questions[index].answerChoices[answerOptions]
                              ? isSubmitted
                                ? questions[index].answerChoices[
                                    answerOptions
                                  ] == questions[index].rightAnswer
                                  ? "rightAnswer selectedAnswer indivAnswerOption"
                                  : "wrongAnswer selectedAnswer indivAnswerOption"
                                : "indivAnswerOption selectedAnswer nonSubmitted"
                              : isSubmitted
                              ? questions[index].answerChoices[answerOptions] ==
                                questions[index].rightAnswer
                                ? "rightAnswer indivAnswerOption"
                                : "wrongAnswer indivAnswerOption"
                              : "indivAnswerOption"
                          }
                        >
                          {questions[index].answerChoices[answerOptions]}
                          {isSubmitted &&
                            answers[index] ==
                              questions[index].answerChoices[answerOptions] && (
                              <span className="selectedText">You picked</span>
                            )}
                        </p>
                      ))}
                  </section>
                </section>
                <div className="quizButtons">
                  {index > 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="black"
                      className="w-6 h-6"
                      onClick={decreaseIndex}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <img
                      className="hidden"
                      onClick={decreaseIndex}
                      src="https://raw.githubusercontent.com/leahthompson01/MathApp/main/public/icons8-back-64.png"
                    ></img>
                  )}
                  {!isSubmitted && Object.keys(answers).length > 9 && (
                    <section className="submitSection" onClick={submitQuiz}>
                      <img
                        className="submitButton"
                        src="https://raw.githubusercontent.com/leahthompson01/MathApp/main/public/icons8-quiz-64.png"
                      />
                      <h3>Submit Quiz</h3>
                    </section>
                  )}
                  {index < questions.length - 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="black"
                      className="w-6 h-6 forwardButton"
                      onClick={increaseIndex}
                      // className="forwardButton"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <img
                      className="hidden"
                      onClick={increaseIndex}
                      src="https://github.com/leahthompson01/MathApp/blob/main/public/icons8-forward-64.png?raw=true"
                    ></img>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
        {results[0] !== undefined && (
          <div className="scores">
            RESULTS
            {results
              .sort((a, b) => a.score - b.score)
              .map((arr, indx) => (
                <div key={uuid()}>
                  {indx == 0 ? (
                    <p className="winner">WINNER: {arr[0]}</p>
                  ) : (
                    <p>User: {arr[0]}</p>
                  )}
                  <p>Score: {arr[1]}</p>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
