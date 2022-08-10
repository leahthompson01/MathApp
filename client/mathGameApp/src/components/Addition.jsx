import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Addition() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  function makeQuestions() {
    // need to update this data to come from
    //my API
    for (let i = 1; i <= 10; i++) {
      let rand1 = Math.floor(Math.random() * 100);
      let rand2 = Math.floor(Math.random() * 100);
      let wrongans1 = Math.floor(Math.random() * 150);
      let wrongans2 = Math.floor(Math.random() * 150);
      let wrongans3 = Math.floor(Math.random() * 150);
      let answer = rand1 + rand2;
      if (
        wrongans1 !== answer &&
        wrongans2 !== answer &&
        wrongans3 !== answer
      ) {
        setQuestions((prevState) => [
          ...prevState,
          {
            question: `What is the sum of ${rand1} + ${rand2}?`,
            answerChoices: {
              wrongans1,
              wrongans2,
              answer,
              wrongans3,
            },
            rightAnswer: `${answer}`,
          },
        ]);
      }
    }
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
    console.log(event.target.innerText);
    const value = event.target.innerText;
    if (value == questions[index].rightAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <section>
      {questions.length > 1 ? (
        <div className="questionsContainer">
          <button onClick={decreaseIndex}>Previous Question</button>
          <section className="middleContainer">
            <p className="score">Your current Score is {score}</p>
            <h2>{questions[index].question}</h2>
            <section className="answerChoices">
              {Object.keys(questions[index].answerChoices)
                .sort((a, b) => a - b)
                .map((answerOptions) => (
                  <p key={uuid()} onClick={selectAnswer}>
                    {questions[index].answerChoices[answerOptions]}
                  </p>
                ))}
            </section>
          </section>
          <button onClick={increaseIndex}>Next Question</button>
        </div>
      ) : (
        <button className="startButton" onClick={makeQuestions}>
          Start Quiz
        </button>
      )}
      {/* want to show each question one at a time */}
      {/* <h2></h2>
      <section className="answerChoices">
        <p></p>
        <p></p>
        <p></p>
        <p></p> */}
    </section>
  );
}
