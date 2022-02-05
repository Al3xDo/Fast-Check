import React, { useState, useEffect } from 'react';
import "./editroom.css"
export const EditRoom = (props) => {
    const { roomName, dateSchedule, timeSchedule, password, code } = props.editRoom

    const onSubmit = () => {
        props.onEditRoom()
        props.onClose()
    }
    return (
        <div className={`modal ${props.onOpen}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Join room</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="add-class">
                        <div className="box">
                            <div className="has-text-centered">
                                <h1 className="title"> Sửa thông tin lớp</h1>
                            </div>
                            <div className="field">
                                <label className="label">Tên lớp</label>
                                <div className="control">
                                    <input className="input"
                                        type="text" placeholder="Text input"
                                        value={roomName || ""}
                                        name="roomName"
                                        onChange={(e) => props.onChangeEdit(e)}
                                    />
                                </div>
                            </div>
                            <div className="time-field">
                                <div className="field">
                                    <label className="label">Hẹn ngày</label>
                                    <div className="control">
                                        <input type="date" className="input"
                                            value={dateSchedule || ""}
                                            name="dateSchedule"
                                            onChange={(e) => props.onChangeEdit(e)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Hẹn giờ</label>
                                    <div className="control">
                                        <input type="time" className="input"
                                            value={timeSchedule || ""}
                                            name="timeSchedule"
                                            onChange={(e) => props.onChangeEdit(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Mật khẩu</label>
                                <div className="control">
                                    <input className="input"
                                        type="text" placeholder="Text input"
                                        value={password || ""}
                                        name="password"
                                        onChange={(e) => props.onChangeEdit(e)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="submit has-text-centered">
                        <div className="button is-primary" onClick={onSubmit}>
                            Sửa lớp
                        </div>
                    </div>
                    {/* <button className="button">Cancel</button> */}
                </footer>

            </div>
        </div>
    );
}
