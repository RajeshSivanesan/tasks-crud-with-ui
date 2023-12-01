import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <>
            <h1>Home</h1>
            <p>
                <Link to="/login">Login</Link>
            </p>
            <p>
                <Link to="/signup">Sign up</Link>
            </p>
            <p>
                <Link to="/tasks">Dashboard</Link>
            </p>
        </>
    );
}

export default Home;