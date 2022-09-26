import { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import Lobby from "./Lobby";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../context/socket";

export default function GenerateQuiz() {
  const socket = useContext(SocketContext)
  const location = useLocation();
  // const url = "https://cryptic-brook-96547.herokuapp.com/quiz";
  const { operation, joiningQuiz,lobbyCode} = location.state;
  // 
  const [newUser, setNewUser] = useState('')
  // console.log('lobby code',lobbyCode)

  const [questions, setQuestions] = useState([
    { question: "", rightAnswer: "", operand: "", answerChoices: {} },
  ]);
  const [response,setResponse] = useState('')
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([])
  const [userLeft, setUserLeft] = useState('false')
  const [indexCorrectAnswers, setIndexCorrectAnswers] = useState([]);
 socket.on('message',msg => {
  let strArr = msg.split(' ')
  console.log('message ' + msg)
  if(strArr.length <= 2){
    setResponse(msg)
  }else if(strArr.includes('joined')){
    setNewUser(msg.split(' ')[0])
  }else if(strArr.includes('left')){
    setUserLeft('true')
  }
  
})
  console.log('new user? ' +newUser)
//  console.log('this is response', response)
//  console.log('lobby code ' + updatedLobby)
//  useEffect(() =>
//  setUpdatedLobby(prevValue => response.split('')[1])
//  ,[response])
let url
if(joiningQuiz == true){
  url = `http://localhost:5000/joinquiz/${lobbyCode}`
}else if(operation !== undefined){
  url = "https://flaskmathapi.onrender.com/quiz/" + operation.toLowerCase()

}
  useEffect(() => {
    async function getQuestionData() {
      try {
        
        const resp = await fetch(
          url
        );
        const data = await resp.json();
        // console.log(data)
      //  console.log( data.forEach(obj => obj = JSON.parse(obj)))
        // const newData = await data.forEach(obj => console.log(JSON.parse(obj)))
        // console.log(newData)
        if(url == `http://localhost:5000/joinquiz/${lobbyCode}`){
          setQuestions(data)
          const resp2 = await fetch(`http://localhost:5000/users/${lobbyCode}`)
          const allUsers = await resp2.json()
          setUsers(allUsers)
        }else{
          setQuestions(data.map(el => JSON.parse(el)));
          // if(response !== undefined || response.length > 1){
          //   const resp3 = await fetch(`http://localhost:5000/users/${response[1].trim()}`)
          //   const otherUsers = await resp3.json()
          //   console.log(otherUsers)
          //   setUsers(prevArr => [...prevArr, otherUsers])
          // }
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    getQuestionData();
  }, [])

  // useEffect(() =>{
  //   if(response != " " && response !== undefined){
  //     socket.emit('quiz_start', {msg: response.split(' ')[1], quiz: questions})
  //   }
  // }, [response])
  if(response != " " && response !== undefined && response !== ''){
    socket.emit('quiz_start', {msg: response.split(' ')[1], quiz: questions})
  }
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
    socket.emit('submit_quiz', {user: response.split(' ')[0],score:count})
  }
  // console.log(indexCorrectAnswers);
  // console.log(answers);
  // console.log(questions);
  // console.log(questions[0]);
    // useEffect(() =>{
    //   //   async function getUsers(){
    //   //     try{
    //   //     console.log('updated Lobby code' + lobbyCode)
    //   //     if(updatedLobby !== undefined){
    //   //       const resp = await fetch(`http://localhost:5000/users/${lobbyCode}`)
    //   //       const users = await resp.json()
    //   //       setUsers(users)
    //   //     }
    //   //     }catch(err){
    //   //     console.log(err)
    //   //   }
    //   // }
    //   // getUsers()
    //   setUpdatedLobby(prev => lobbyCode)
    //   console.log('updated Lobby code' + lobbyCode)
    // }, [lobbyCode])
  
  return (
    <>
      <section className="quizPage">
        <Lobby 
         message =  {response.split(' ')}
         users = {users}
         currentLobby = {lobbyCode}
         newUser = {newUser}
        />
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
                              ? questions[index].answerChoices[answerOptions] ==
                                questions[index].rightAnswer
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
                  <img
                    className="backButton"
                    onClick={decreaseIndex}
                    src="https://raw.githubusercontent.com/leahthompson01/MathApp/main/public/icons8-back-64.png"
                  ></img>
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
                  <img
                    className="forwardButton"
                    onClick={increaseIndex}
                    src="https://github.com/leahthompson01/MathApp/blob/main/public/icons8-forward-64.png?raw=true"
                  ></img>
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
      </section>
    </>
  );
}
