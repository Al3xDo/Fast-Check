import React, { useState } from 'react';
import "./addroom.css"
export const AddRoom = (props) => {
    const [roomName, setName] = useState("")
    const [timeSchedule, setTimeSchedule] = useState("")
    const [dateSchedule, setDateSchedule] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const formatDate = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(6, 7)
        const day = date.slice(8)
        const formatedDate = day + "/" + month + "/" + year
        return formatedDate
    }
    const onClear = () => {
        setName("")
        setTimeSchedule("")
        setDateSchedule("")
        setPassword("")
        setCode("")
    }
    const onSubmit = () => {
        var room = {
            roomName: roomName,
            dateSchedule: formatDate(dateSchedule),
            timeSchedule: timeSchedule,
            password: password,
        }
        props.onAddRoom(room)
        props.onClose()
        onClear()
    }
    return (
        <div className={`modal ${props.onOpen}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add room</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="add-class">
                        <div className="box">
                            <div className="field">
                                <label className="label">Tên lớp</label>
                                <div className="control">
                                    <input className="input"
                                        type="text" placeholder="Text input"
                                        value={roomName}
                                        name="roomName"
                                        onChange={(event) => { setName(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="time-field">
                                <div className="field">
                                    <label className="label">Hẹn ngày</label>
                                    <div className="control">
                                        <input type="date" className="input"
                                            value={dateSchedule}
                                            name="dateSchedule"
                                            onChange={(event) => { setDateSchedule(event.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Hẹn giờ</label>
                                    <div className="control">
                                        <input type="time" className="input"
                                            value={timeSchedule}
                                            name="timeSchedule"
                                            onChange={(event) => { setTimeSchedule(event.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Mật khẩu</label>
                                <div className="control">
                                    <input className="input"
                                        type="text" placeholder="Text input"
                                        value={password}
                                        name="password"
                                        onChange={(event) => { setPassword(event.target.value) }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="submit has-text-centered">
                        <div className="button is-primary" onClick={onSubmit}>
                            Thêm lớp
                        </div>
                    </div>
                    {/* <button className="button">Cancel</button> */}
                </footer>
            </div>

        </div>
    );
}
