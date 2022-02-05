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
                    <p className="modal-card-title">Invite code</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="control columns">
                        <div className="column is-9">
                            <p style={{ fontSize: "26px" }}>{props.publicId}</p>
                        </div>
                        <div className="column">
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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
