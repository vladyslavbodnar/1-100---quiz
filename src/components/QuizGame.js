import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function QuizGame() {

    const [quiz, setQuiz] = useState(null);
    const [quizCount, setQuizCount] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState("");
    const [choosenAnswer, setChoosenAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(null);

    const fetchData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id")
        fetch(`http://localhost:8000/quizes/${id}`)
            .then(res => res.json())
            .then(quiz => setQuiz(quiz));
    }

    const nextQuestion = () => {
        setQuizAnswers(prev => `${prev}${choosenAnswer}`)
        setChoosenAnswer(null);
        setQuizCount(prev => prev + 1);
    }

    const checkResults = () => {
        let count = 0;
        for (let i = 0; i < quiz.questions.length; i++) {
            if (quizAnswers[i] === quiz.questions[i].correctAnswer) {
                count++;
            }
        }
        setCorrectAnswers(count);
        return count;
    }

    const saveToLocaleStorage = (correctAnswers) => {
        let storageData = JSON.parse(localStorage.getItem("quiz-results")) || [];

        let found = false;
        for (let i = 0; i < storageData.length; i++) {
            if (storageData[i]?.id === quiz.id && storageData[i]?.title === quiz.title) {
                storageData = storageData.map(element => {
                    if (element?.id === quiz.id && element?.title === quiz.title) {
                        return element = {id: quiz.id, title: quiz.title, correctAnswers: correctAnswers}
                    }
                    return element;
                })

                storageData = JSON.stringify(storageData);

                found = true;
            }
        }
        if(!found) {
            storageData = JSON.stringify([...storageData, {id: quiz.id, title: quiz.title, correctAnswers: correctAnswers}]);
        }
        localStorage.setItem("quiz-results", storageData)
    }

    const finishGame = (e) => {
        const correctAnswersCached = checkResults();
        saveToLocaleStorage(correctAnswersCached)
    }

    useEffect(fetchData, []);

    useEffect(() => {
        if (quizCount === quiz?.questions.length) {
            finishGame();
        }
    }, [quizCount])

    return (
        <div className="game">
            {quiz?.questions[quizCount] ? (
                <div className="game__quiz">
                    <h1 className="game__title">{quiz.title}</h1>
                    <h2 className="game__question">{quiz.questions[quizCount].title}</h2>

                    <label className="game__label">
                        <input type="radio" name="answer" checked={choosenAnswer === "A"} onChange={() => setChoosenAnswer("A")} className="game__radio" />
                        <p>{quiz.questions[quizCount].A}</p>
                    </label>
                    <label className="game__label">
                        <input type="radio" name="answer" checked={choosenAnswer === "B"} onChange={() => setChoosenAnswer("B")} className="game__radio" />
                        <p>{quiz.questions[quizCount].B}</p>
                    </label>
                    <label className="game__label">
                        <input type="radio" name="answer" checked={choosenAnswer === "C"} onChange={() => setChoosenAnswer("C")} className="game__radio" />
                        <p>{quiz.questions[quizCount].C}</p>
                    </label>
                    <label className="game__label">
                        <input type="radio" name="answer" checked={choosenAnswer === "D"} onChange={() => setChoosenAnswer("D")} className="game__radio" />
                        <p>{quiz.questions[quizCount].D}</p>
                    </label>


                    <button onClick={nextQuestion} className="game__button">Next question</button>
                </div>
            ) : (
                <div className="game__results">
                    <p className="game__results-text">Result: {correctAnswers}/{quizCount}</p>
                    <Link to="/" className="game__button">Go back to main menu</Link>
                </div>
            )}
            
        </div>
    )
}
