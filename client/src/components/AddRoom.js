import React, { useState } from 'react';
import "./addroom.css"
import { callApiWithToken } from '../utils/apiCaller';
import { toastError, toastSuccess } from '../utils/toastNotify';
export const AddRoom = (props) => {
    const [name, setName] = useState("")
    const [timeSchedule, setTimeSchedule] = useState("")
    const [dateSchedule, setDateSchedule] = useState("")
    const [password, setPassword] = useState("")
    // const [code, setCode]= useState("")
    const formatDate = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(6, 7)
        const day = date.slice(8)
        const formatedDate = day + "/" + month + "/" + year
        return formatedDate
    }
    const onSubmit = () => {
        var room = {
            name: name,
            dateSchedule: formatDate(dateSchedule),
            timeSchedule: timeSchedule,
            password: password,
        }
        // callApiWithToken(Config.ROOM_CREATE_ENDPOINT, 'POST', room, props.token)
        //     .then(res => {
        //         toastSuccess(String(res.data.message))
        //     })
        //     .catch(err => {
        //         toastError(String(err.response.message))
        //     })
    }
    return (
        <div className={`modal ${props.onOpen}`}>
            <div className="add-class">
                <div className="box">
                    <div className="has-text-centered">
                        <h1 className="title"> Thêm thông tin lớp</h1>
                    </div>
                    <div className="field">
                        <label className="label">Tên lớp</label>
                        <div className="control">
                            <input className="input"
                                type="text" placeholder="Text input"
                                value={name}
                                name="name"
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
                    <div className="submit has-text-centered">
                        <div className="button is-primary" onClick={onSubmit}>
                            Thêm lớp
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
