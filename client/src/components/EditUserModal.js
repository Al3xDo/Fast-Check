import React from 'react';
import { useState } from 'react';

const EditUserModal = (props) => {
    const [trigger, setTrigger]= useState("")
    return (
        <div className="user-infor">
            <h1 className="title">{props.name}</h1>
            <div className="user-info">
                <h1 className="edit-email-fontsize">{props.email}</h1>
                <button 
                onClick={() => {setTrigger("is-active")}}
                className="no-border edit-button"><ion-icon name="create-outline"></ion-icon></button>
                <div className={`modal ${trigger}`}>
                <div className="modal-background">
                <div className="modal-content mt-50">
                <div className="box is-relative">
            <div className="edit-close-modal">
            <button className="no-border"
                onClick={() => {setTrigger("")}}
                aria-label="close"><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <div>
                <h1 className="title">Sửa thông tin</h1>
            </div>
            <div className="field is-horizontal mt-20">
                <div className="field-label is-normal">
                    <label className="label">Tên</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="text"/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Email</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="email"/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Password</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="password" autoComplete="new-password"/>
                        </p>
                    </div>
                </div>  
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Old Password</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="password" autoComplete="new-password"/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Confirm Password</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="password" autoComplete="new-password"/>
                        </p>
                    </div>
                </div>
            </div>
                <div className="submit has-text-centered">
                    <div className="button is-primary"> Sửa
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
                    </div>
                </div>
        
    );
}

export default EditUserModal;
