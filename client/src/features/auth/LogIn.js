import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastNotify";
import { selectAuth, logIn, set } from "./authSlice";
import { useLocation } from "react-router";
import "./style.css"
import { callApi } from "../../utils/apiCaller";
export const LogIn = (props) => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const location = useLocation()
    const [password, setPassword] = useState("")
    const handleSubmit = async () => {
        const user = {
            email: email,
            password: password
        }
        // try {
        //     dispatch(logIn(user))
        // }
        // catch (e) {
        //     console.log("error", e)
        // }
        dispatch(logIn(user))
        // console.log(result)
    }
    if (authState.loading === "error") toastError(authState.error)
    if (authState.loading === "loaded") return <Redirect to={location.state ? location.state.from.pathname : "/"} />
    return (
        <form className="my-form" >
            <div className="box">
                <h1 className="title has-text-centered">Log In</h1>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="person-circle-outline"></ion-icon>
                        </span>
                        <span className="icon is-small is-right">
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-rounded"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                    </div>
                </div>
                <div className="btn-form">
                    <button className="button is-primary btn-form"
                        type="button"
                        onClick={handleSubmit}
                    >Log In
                    </button>
                </div>
                <div className="columns mt-20px form-setting">
                    <div >
                        or <span> </span>
                        <a href="/signup">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </form>
    );
}