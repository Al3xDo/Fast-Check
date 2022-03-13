import React, { useState } from 'react';
import { callApi } from '../../utils/apiCaller';
import { toastError, toastSuccess } from '../../utils/toastNotify';
import catLogo from "../../asset/image/cat.png"
export const PasswordRecover = () => {
    const [email, setEmail] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email
        }
        callApi("user/forget-password", "POST", data)
            .then((res) => {
                toastSuccess(res.data.message)
            })
            .catch((err) => {
                toastError(err.response.data.message)
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
                                <>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input type="text"
                                                className="input is-rounded"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field has-text-centered">
                                        <button className='button is-success' type="submit">
                                            Send recover email
                                        </button>
                                    </div>
                                </>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

