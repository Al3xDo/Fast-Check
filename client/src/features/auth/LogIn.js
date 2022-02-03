import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { toastError } from "../../utils/toastNotify";
import { selectAuth, logIn } from "./authSlice";

export const LogIn = () => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = () => {
        const user = {
            email: email,
            password: password
        }
        try {
            dispatch(logIn(user))
        }
        catch (e) {
            toastError(e.message)
        }
    }
    if (authState.loading === "loaded") return <Redirect to="/" />
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