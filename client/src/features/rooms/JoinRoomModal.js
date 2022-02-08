import React, { useState } from 'react';

export const JoinRoomModal = (props) => {
    const [publicId, setPublicId] = useState("")
    const onSubmit = () => {
        props.onSubmit(publicId)
    }
    return (
        <div className={`modal ${props.open}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Join room</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Invite code</label>
                        <div className="control">
                            <input className="input"
                                type="text" placeholder="Text input"
                                value={publicId}
                                name="publicId"
                                onChange={(e) => setPublicId(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="button is-primary" onClick={onSubmit}>
                        Join
                    </div>
                    {/* <button className="button">Cancel</button> */}
                </footer>
            </div>
        </div>
    );
}
