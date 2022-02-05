import React, { useState } from 'react';
import { toastSuccess } from '../../utils/toastNotify';
export const InviteModal = (props) => {
    const [clicked, setClicked] = useState(false)
    const onCopy = () => {
        setClicked(true)
        navigator.clipboard.writeText(props.publicId)
        toastSuccess("copy to clipboard")
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
                            <p>{props.publicId}</p>
                        </div>
                    </div>
                    <button className="button"
                        onClick={onCopy}
                    >
                        <span className="icon is-small">
                            {clicked ?
                                <ion-icon name="checkbox-outline"></ion-icon>
                                :
                                <ion-icon name="clipboard-outline"></ion-icon>
                            }
                        </span>
                    </button>
                </section>
            </div>
        </div>
    );
}
