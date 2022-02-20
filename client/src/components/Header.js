import { Link } from "react-router-dom"
import catLogo from "../asset/image/cat.png"
import { logOut } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { selectAuth } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
const Header = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const onLogOut = () => {
        dispatch(logOut(authState.token))
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
                    My Rooms
                </a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <Link to="/login">
                        <button className="button is-primary"
                            onClick={onLogOut}
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