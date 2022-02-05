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
                    <div className="submit has-text-centered">
                        <div className="button is-primary" onClick={onSubmit}>
                            Sửa lớp
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
