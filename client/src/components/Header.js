import { Link } from "react-router-dom"
import catLogo from "../asset/image/cat.png"
const Header = (props) => {
    const Logout = () => {
        localStorage.removeItem("cat-check-token")
    }
    return (
        <nav className="navbar is-light mb-30" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={catLogo} alt="logo" />
                </a>
            </div>
            <div className="navbar-menu">
                <a href="/" className="navbar-item">
                    Khóa học của tôi
                </a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <Link to="/login">
                        <button className="button is-primary"
                            onClick={Logout}
                        >
                            Log out
                        </button>
                    </Link>
                </div>
                <div className="navbar-item">
                    <Link to="/information">
                        <ion-icon name="person-outline"></ion-icon>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default Header;