import React, { useState } from 'react';
import catLogo from "../../asset/image/cat.png"
import { callApi } from '../../utils/apiCaller';
import { toastError } from '../../utils/toastNotify';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
const Recover = () => {
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")
    const [isSucceed, setIsSucceed] = useState(true)
    const history = useHistory()
    const onSubmit = () => {
        const data = {
            newPassword: password
        }
        callApi("recover/", "POST", data)
            .then(req => {
                history.push("/")
            })
            .catch(err => {
                setIsSucceed(false)
                toastError(err.response.message)
            })
    }
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-6-desktop is-6-widescreen">
                            <form onSubmit={onSubmit} className="box">
                                <div className="has-text-centered">
                                    <div className="">
                                        <img style={{ width: "5rem" }} src={catLogo} />
                                    </div>
                                    <h1 className="title is-3">Recover Password</h1>
                                </div>
                                {isSucceed ? (
                                    <>
                                        <div className="field">
                                            <label for="" className="label">New Password</label>
                                            <div className="control has-icons-left">
                                                <input type="password"
                                                    className="input"
                                                    required
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label for="" className="label">Confirm New Password</label>
                                            <div className="control has-icons-left">
                                                <input type="password"
                                                    className="input"
                                                    required
                                                    name="passwordConfirmed"
                                                    value={passwordConfirmed}
                                                    onChange={(e) => setPasswordConfirmed(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field has-text-centered">
                                            <button className='button is-success' type="submit">
                                                Update new password
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="has-text-centered">
                                        <h1 className='title is-3'> Link is expired, try get another link</h1>
                                    </div>
                                )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Recover;
