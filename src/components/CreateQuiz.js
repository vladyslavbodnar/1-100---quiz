import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";


export default function CreateQuiz() {

    const dataTemplate = {
        title: "",
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: ""
    };

    const history = useHistory();

    const [data, setData] = useState({
        title: "",
        questions: [],
    });

    useEffect(() => {
        setData(prev => ({...prev, questions: [dataTemplate]}))
    }, [])

    const createQuiz = (e) => {
        e.preventDefault();

        fetch("http://localhost:8000/quizes", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            history.push("/");
        });
    };

    const createNewQuestion = (e) => {
        e.preventDefault();
        
        setData(prev => ({...prev, questions: [...prev.questions, dataTemplate]}))
    };

    return (
        <div className="create-quiz">
            <form action="">
                <label className="create-quiz__label create-quiz__title">
                    Quiz title: <input type="text" className="create-quiz__input" value={data.title} onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))} />
                </label>

                {data.questions.map((element, index) => (
                    <div className="create-quiz__question" key={index}>
                        <label className="create-quiz__label">
                            Question {index + 1} <input type="text" className="create-quiz__input" value={element.title} onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].title = e.target.value;
        
                                return result;
                            })}/>
                        </label>
                        
                        <label className="create-quiz__label">
                            Answer 1
                            <input type="text" className="create-quiz__input" value={element.A} onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].A = e.target.value;
                                return result;
                            })}/>
                        </label>
                        <label className="create-quiz__label">
                            Answer 2
                            <input type="text" className="create-quiz__input" value={element.B} onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].B = e.target.value;
                                return result;
                            })}/>
                        </label>
                        <label className="create-quiz__label">
                            Answer 3
                            <input type="text" className="create-quiz__input" value={element.C} onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].C = e.target.value;
                                return result;
                            })}/>
                        </label>
                        <label className="create-quiz__label">
                            Answer 4
                            <input type="text" className="create-quiz__input" value={element.D} onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].D = e.target.value;
                                return result;
                            })}/>
                        </label>
                        <label className="create-quiz__label">
                            Select corrent answer
                            <select value={element.correctAnswer} className="create-quiz__select" onChange={e => setData(prev => {
                                const result = {...prev};
                                result.questions[index].correctAnswer = e.target.value;
                                return result;
                            })}>
                                <option value="" disabled hidden></option>
                                <option value="A">1</option>
                                <option value="B">2</option>
                                <option value="C">3</option>
                                <option value="D">4</option>
                            </select>
                        </label>
                    </div>
                ))}

                <button onClick={(e) => createNewQuestion(e)} className="create-quiz__button">One more question</button>

                <button onClick={(e) => createQuiz(e)} className="create-quiz__button">Create quiz</button>
            </form>
            <Link to="/" className="create-quiz__button create-quiz__link">Go back to main menu</Link>
        </div>
    )
}
