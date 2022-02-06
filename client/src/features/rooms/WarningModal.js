import React from 'react';
import "./warningmodal.css"
export const WarningModal = (props) => {

    const onClose = (event) => {
        props.onClose(event);
    }
    return (
        <div className={`modal ${props.onOpen}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                    <header className="modal-card-head">
                        <h1 className="title">
                            {props.type === "delete" ?
                                (
                                    "bạn có chắc chắn muốn xoá phòng ?"
                                ) :
                                (
                                    "bạn có chắc chắn muốn thoát phòng ?"
                                )}
                        </h1>
                    </header>
                    <section className="modal-card-body modal-warning-btns ">
                        <button
                            className="button is-primary mr-5"
                            aria-label="close"
                            onClick={() => { onClose(true) }}
                        >Chắc chắn
                        </button>
                        <button
                            className="button is-danger"
                            aria-label="close"
                            onClick={() => { onClose(false) }}
                        >Không
                        </button>
                    </section>

                </div>
            </div>
        </div>
    );
}

export default WarningModal;
