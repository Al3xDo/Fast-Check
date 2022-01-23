import { useState } from "react";
import "./style.css"
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as TokenActions from "../../actions/token"
import { callApi } from "../../utils/apiCaller";
import { toastError, toastSuccess } from "../../utils/toastNotify";
import * as SysVar from "../../constant/system_variable"
import { Redirect } from "react-router";
import * as Config from "../../constant/api"
const UserFormPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [remember, setRemember] = useState(false);
    const [signUp, setsignUp] = useState(false)

    const onLogin = () => {
        var data = {
            email: username,
            password: password
        }
        if (password.length >= SysVar.LENGTH_OF_PASSWORD)
        {
            const { TokenActionsCreator} = props
            const { saveToken } = TokenActionsCreator
            callApi(Config.LOGIN_ENDPOINT, 'POST', data)
            .then(res => {
                // save token
                saveToken(res.data.token)
                toastSuccess(res.data.message)
            })
            .catch(err => {
                toastError(err.response.data.message)
            })
        }
        
        }
        const onSignup = () => {
            var data = {
                email: username,
                password: password
            }
        if (password.length > SysVar.LENGTH_OF_PASSWORD)
        {
            const { TokenActionsCreator} = props
        const { saveToken } = TokenActionsCreator
        callApi(Config.SIGNUP_ENDPOINT, 'POST', data)
        .then(res => {
            // save token
            // saveToken(res.data.token)
            toastSuccess(String(res.data.message))
            window.location("/login")
        })
        .catch(err => {
            toastError(String(err.response.data.message))
            })
        }
        
    }
    const passwordConfirmField = () => {
        if (signUp) {
            return (
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-rounded"
                            type="password"
                            placeholder="Password"
                            name="formPassword"
                            value={passwordConfirm}
                            onChange={(event) => { setPasswordConfirm(event.target.value) }}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        {showErrorPasswordConfirm()}
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
    const formFooter = () => {
        if (signUp) {
            return (
                <div >
                    or <span> </span>
                    <a onClick={() => setsignUp(false)} >
                        Log in
                    </a>
                </div>
            )
        }
        else {
            return (
                <div >
                    or <span> </span>
                    <a onClick={() => setsignUp(true)} >
                        Sign Up
                    </a>
                </div>
            )
        }
    }
    const formButton = () => {
        if (signUp) {
            return (
                <button className="button is-primary btn-form"
                    type="button" onClick={onSignup}
                >Sign Up
                </button>
            )
        } else {
            return (
                <button className="button is-primary btn-form"
                    type="button" onClick={onLogin}
                > Log in
                </button>
            )
        }
    }

    const formTitle = () => {
        if (signUp) {
            return (
                <h1 className="title has-text-centered">Sign Up</h1>
                )
            } else {
            return (
                <h1 className="title has-text-centered">Log In</h1>
                )
            }
        }
    const formConfig = () => {
        if (signUp) {
            return null
        }
        else {
            return (
                <div className="columns mt-20px form-setting">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        <span> </span>Remember me</label>

                    <a href="./">
                        Forgot Password
                    </a>
                </div>
            )
        }
    }
    const showErrorPassword = () => {
        if (password.length >= 0 && password.length < SysVar.LENGTH_OF_PASSWORD) {
            return (
                <>
                    <span className="icon is-small is-right">
                        <ion-icon name="alert-outline"></ion-icon>
                    </span>
                    <p className="help is-danger">Password length must be more than {SysVar.LENGTH_OF_PASSWORD}</p>
                </>
            )
        }
        else
            return (
                <>
                    <span className="icon is-small is-right">
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </span>
                </>
            )
    }
    const showErrorPasswordConfirm = () => {
        if (passwordConfirm !== password) {
            return (
                <>
                    <span className="icon is-small is-right">
                        <ion-icon name="alert-outline"></ion-icon>
                    </span>
                    <p className="help is-danger">Both password must be the same</p>
                </>
            )
        }
        else
            return (
                <>
                    <span className="icon is-small is-right">
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </span>
                </>
            )
    }
    if (props.token) {
        return <Redirect to="/" />
    }
    return (
        <form className="my-form" >
            <div className="box">
                {formTitle()
                }
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Username"
                            value={username}
                            name="formUsername"
                            onChange={(event) => { setUsername(event.target.value) }}
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
                            name="formPassword"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value); }}
                        />
                        <span className="icon is-small is-left">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        {showErrorPassword()}
                    </div>
                </div>
                {passwordConfirmField()}
                {formConfig()}
                <div className="btn-form">
                    {formButton()}
                </div>
                <div className="columns mt-20px form-setting">
                    {formFooter()}
                </div>
            </div>
        </form>
    );
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        TokenActionsCreator: bindActionCreators(TokenActions, dispatch)
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(UserFormPage);