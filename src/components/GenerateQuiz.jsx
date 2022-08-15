import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function GenerateQuiz() {
  const location = useLocation();
  // const url = "https://cryptic-brook-96547.herokuapp.com/quiz";
  const { operation } = location.state;
  console.log(operation);
  const [questions, setQuestions] = useState([
    { question: "", rightAnswer: "", operand: "", answerChoices: {} },
  ]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [indexCorrectAnswers, setIndexCorrectAnswers] = useState([]);
  useEffect(() => {
    console.log("plz world");
    fetch(
      "https://cryptic-brook-96547.herokuapp.com/quiz?operation=" + operation
    )
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
    // setQuestions(data);
  }, []);

  // console.log(questions);

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
    console.log(event.target.innerText);
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
  console.log(answers);
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
    console.log(score);
    console.log(count);
  }
  console.log(indexCorrectAnswers);
  // console.log(questions);
  // console.log(questions[0]);
  return (
    <>
      <section>
        <div className="questionsContainer">
          <button onClick={decreaseIndex}>Previous Question</button>
          <section className="middleContainer">
            {isSubmitted && <p className="score">Your Score is {score}</p>}
            <h2>{questions[index].question}</h2>
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
                      isSubmitted
                        ? questions[index].answerChoices[answerOptions] ==
                          questions[index].rightAnswer
                          ? "rightAnswer indivAnswerOption"
                          : "wrongAnswer indivAnswerOption"
                        : "indivAnswerOption"
                    }
                  >
                    {questions[index].answerChoices[answerOptions]}
                  </p>
                ))}
            </section>
          </section>
          <button onClick={increaseIndex}>Next Question</button>
        </div>
        {!isSubmitted && <button onClick={submitQuiz}>Submit Quiz</button>}
      </section>
    </>
  );
}
