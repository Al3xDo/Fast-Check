import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { MAX_LENGTH_OF_PASSWORD, MIN_LENGTH_OF_PASSWORD } from "../../constant/system_variable";
import { selectAuth, signUp } from "./authSlice";
import { passwordValidate } from "./common/PasswordValidate";
import "./style.css"
export const SignUp = () => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [haveError, setHaveError] = useState(true)
    const [showPassword, setShowPassword] = useState(0)
    const handleSubmit = () => {
        if (haveError) {
            const newUser = {
                email: email,
                password: password
            }
            dispatch(signUp(newUser))
        }

    }
    if (authState.loading === "loaded") return <Redirect to="/login" />
    return (
        <form className="my-form" >
            <div className="box">
                <h1 className="title has-text-centered">Sign Up</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
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
                            type={showPassword == 1 ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        {
                            (passwordValidate(password)) ?
                                (
                                    <>
                                        <span className="icon is-small is-right">
                                            {showPassword !== 1 ?
                                                (
                                                    <ion-icon onClick={() => setShowPassword(1)} style={{ pointerEvents: "auto" }} name="eye-outline"></ion-icon>
                                                ) :
                                                (
                                                    <ion-icon onClick={() => setShowPassword(0)} style={{ pointerEvents: "auto" }} name="eye-off-outline"></ion-icon>
                                                )}
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </span>
                                    </>
                                ) : (
                                    <>

                                        <span className="icon is-small is-right">
                                            {showPassword !== 1 ?
                                                (
                                                    <ion-icon onClick={() => setShowPassword(1)} style={{ pointerEvents: "auto" }} name="eye-outline"></ion-icon>
                                                ) :
                                                (
                                                    <ion-icon onClick={() => setShowPassword(0)} style={{ pointerEvents: "auto" }} name="eye-off-outline"></ion-icon>
                                                )}
                                            <ion-icon name="alert-outline"></ion-icon>
                                        </span>
                                        <p className="help is-danger">Password need to have Minimum {MIN_LENGTH_OF_PASSWORD} and maximum {MAX_LENGTH_OF_PASSWORD} characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-rounded"
                            type={showPassword == 2 ? "text" : "password"}
                            placeholder="confirm your password"
                            name="confirmedPassword"
                            value={confirmedPassword}
                            onChange={(event) => { setConfirmedPassword(event.target.value) }}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        {
                            confirmedPassword !== password && password !== "" ?
                                (
                                    <>
                                        <span className="icon is-small is-right">
                                            {showPassword !== 2 ?
                                                (
                                                    <ion-icon onClick={() => setShowPassword(2)} style={{ pointerEvents: "auto" }} name="eye-outline"></ion-icon>
                                                ) :
                                                (
                                                    <ion-icon onClick={() => setShowPassword(0)} style={{ pointerEvents: "auto" }} name="eye-off-outline"></ion-icon>
                                                )}
                                            <ion-icon name="alert-outline"></ion-icon>
                                        </span>
                                        <p className="help is-danger">Both password must be the same</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="icon is-small is-right">
                                            {showPassword !== 2 ?
                                                (
                                                    <ion-icon onClick={() => setShowPassword(2)} style={{ pointerEvents: "auto" }} name="eye-outline"></ion-icon>
                                                ) :
                                                (
                                                    <ion-icon onClick={() => setShowPassword(0)} style={{ pointerEvents: "auto" }} name="eye-off-outline"></ion-icon>
                                                )}
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </span>
                                    </>
                                )
                        }
                    </div>
                </div>
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
        </form >
    );
}