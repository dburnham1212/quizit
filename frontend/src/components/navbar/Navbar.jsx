import styles from "../../styles/Navbar/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img src="/quizitlogo.jpg" alt="quizit logo" height="50px" width="50px" />
            <Link className={styles.nav_link} to="/">
                Home
            </Link>
            <Link className={styles.nav_link} to="/login">
                Login
            </Link>
            <Link className={styles.nav_link} to="/register">
                Register
            </Link>
        </nav>
    );
};

export default Navbar;
