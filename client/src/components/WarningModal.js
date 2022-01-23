import React from 'react';
import { useState } from 'react';
import "./warningmodal.css"
const WarningModal = (props) => {

    const onClose =(event) => {
        props.onClose(event);
    }
    return (
    <div class={`modal ${props.onOpen}`}>
    <div className="modal-background"></div>
            <div class="modal-content">
            <div className="box">
            <header className= "modal-card-head">
            <h1 className="title">
                        bạn có chắc chắn muốn thoát ?
            </h1>
            </header>
            <section className="modal-card-body modal-warning-btns ">
            <button 
                    class="button is-primary mr-5" 
                    aria-label="close"
                    onClick={() => {onClose(true)}}
                    >Chắc chắn
                </button>
                <button 
                    class="button is-danger" 
                    aria-label="close"
                    onClick={() => {onClose(false)}}
                    >Không
                </button>
            </section>
                
                </div>
                </div>
        </div>
    );
}

export default WarningModal;
