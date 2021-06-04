import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import QuizGame from "./components/QuizGame";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/game">
                        <QuizGame />
                    </Route>
                    <Route path="/create-quiz">
                        <CreateQuiz />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
