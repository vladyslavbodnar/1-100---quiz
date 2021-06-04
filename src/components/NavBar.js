import { Link } from "react-router-dom";

export default function NavBar({onClick}) {
    return (
        <div className="navbar">
            <button onClick={e => onClick(e)} className="navbar__button">Clear data</button>
            <Link to="/create-quiz" className="navbar__button">Create new quiz</Link>
        </div>
    )
}
