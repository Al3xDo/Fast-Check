import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { toastSuccess } from "../../utils/toastNotify";
import { selectAuth, signUp } from "./authSlice";

export const SignUp = (props) => {
    const authState = useSelector(selectAuth)
    const history = useHistory()
    // const isLoading = useState('idle')
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [haveError, setHaveError] = useState(true)
    const MINIMUM_LENGTH_OF_PASSWORD = 2
    const handleSubmit = () => {
        if (haveError) {
            const newUser = {
                email: email,
                password: password
            }
            dispatch(signUp(newUser))
        }

    }
    // if ((password.length >= 0 && password.length < MINIMUM_LENGTH_OF_PASSWORD) ||
    //     confirmedPassword !== password) {
    //     setHaveError(true)
    // }
    // else {
    //     setHaveError(false)
    // }
    authState.loading === "loaded" && history.push("/")
    return (
        <form className="my-form" >
            <div className="box">
                <h1 className="title has-text-centered">Sign Up</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icon is-left has-icons-right">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="email"
                            name="email"
                            value={email}
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
                        {
                            (password.length >= 0 && password.length < MINIMUM_LENGTH_OF_PASSWORD) ?
                                (
                                    <>
                                        <span className="icon is-small is-right">
                                            <ion-icon name="alert-outline"></ion-icon>
                                        </span>
                                        <p className="help is-danger">Password length must be more than {MINIMUM_LENGTH_OF_PASSWORD}</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="icon is-small is-right">
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </span>
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-rounded"
                            type="password"
                            placeholder="confirm your password"
                            name="confirmedPassword"
                            value={confirmedPassword}
                            onChange={(event) => { setConfirmedPassword(event.target.value) }}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                    </div>
                </div>
                {
                    confirmedPassword !== password ?
                        (
                            <>
                                <span className="icon is-small is-right">
                                    <ion-icon name="alert-outline"></ion-icon>
                                </span>
                                <p className="help is-danger">Both password must be the same</p>
                            </>
                        ) : (
                            <>
                                <span className="icon is-small is-right">
                                    <ion-icon name="checkmark-outline"></ion-icon>
                                </span>
                            </>
                        )
                }
                <div className="btn-form">
                    <button className="button is-primary btn-form"
                        type="button"
                        onClick={handleSubmit}
                    >Sign Up
                    </button>
                </div>
                <div className="columns mt-20px form-setting">
                    <div >
                        or <span> </span>
                        <a href="/login" >
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </form>
    );
}