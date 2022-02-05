import { connect } from "react-redux"
import { compose } from "redux"
import { Redirect } from "react-router"
import { deleteToken } from "../actions/token"
import { useState } from "react"
import catLogo from "../asset/image/cat.png"
const Header = (props) => {
    const [logout, setLogout] = useState(false)
    const Logout = () => {
        // localStorage.removeItem("cat-check-token")
        props.deleteToken()
        setLogout(true)
    }
    if (logout) {
        return <Redirect to="/login" />
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
                    <button className="button is-primary"
                        onClick={Logout}
                    >
                        Log out
                    </button>
                </div>
                <div className="navbar-item">
                    <a href="/information" className="button">
                        <ion-icon name="person-outline"></ion-icon>
                    </a>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteToken: () => {
            dispatch(deleteToken())
        }
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Header);
// export default Header;