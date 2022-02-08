import React, { useState, useEffect } from 'react';
import "./editroom.css"
export const AttendaceModal = (props) => {
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const onSubmit = () => {
        const data = {
            timeStart: timeStart,
            timeEnd: timeEnd
        }
        props.onCreateAttendance(data)
        props.onClose()
    }
    return (
        <div className={`modal ${props.open}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Điểm danh</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="add-class">
                        <div className="box">
                            <div className="columns">
                                <div className="field column">
                                    <label className="label">Giờ bắt đầu</label>
                                    <div className="control">
                                        <input type="time" className="input"
                                            value={timeStart}
                                            name="timeStart"
                                            onChange={(e) => setTimeStart(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field column">
                                    <label className="label">Giờ kết thúc</label>
                                    <div className="control">
                                        <input type="time" className="input"
                                            value={timeEnd}
                                            name="timeEnd"
                                            onChange={(e) => setTimeEnd(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="submit has-text-centered">
                        <div className="button is-primary" onClick={onSubmit}>
                            Thực hiện điểm danh
                        </div>
                    </div>
                    {/* <button className="button">Cancel</button> */}
                </footer>

            </div>
        </div>
    );
}
