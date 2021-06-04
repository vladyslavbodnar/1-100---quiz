import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home() {
    const [correctAnswers, setCorrectAnswers] = useState(null);
    const [quizes, setquizes] = useState(null);

    const fetchCorrectAnswers = () => {
        setCorrectAnswers(JSON.parse(localStorage.getItem("quiz-results")));
    }

    const clearAnswersData = (e) => {
        e.preventDefault();
        localStorage.removeItem("quiz-results");
        setCorrectAnswers(null);
    }

    useEffect(() => {
        fetch("http://localhost:8000/quizes")
        .then(res => res.json())
        .then(data => setquizes(data));
        fetchCorrectAnswers();
    }, [])


    const quizesDOM = []

    // make dom elements
    if(quizes) {
        quizes.map(el => {
            let correctAnswersDOM;
            if(correctAnswers) {
                for (const storageElem of correctAnswers) {
                    if (storageElem.id === el.id && storageElem.title === el.title) {
                        correctAnswersDOM = <p>Best result: {storageElem.correctAnswers}/{el.questions?.length}</p>
                    } else {
                        correctAnswersDOM = <p>New</p>;
                    }
                }
            } else {
                correctAnswersDOM = <p>New</p>;
            }
            
            quizesDOM.push((
                    <div className="home__quiz" key={el.id}>
                        <h1>{el.title}</h1>
                        <Link to={`game?id=${el.id}`} className="home__quiz-link">Start</Link>
                        {correctAnswersDOM && correctAnswersDOM}
                    </div>
                ))
        })
    }

    




    return (
        <div className="home">
            <NavBar onClick={clearAnswersData} />
            <div className="home__quizes">
                {quizesDOM}
            </div>
        </div>
    )
}
