import React, { useEffect, useState } from 'react';
import { callApi } from '../../utils/apiCaller';
import { selectAuth } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { toastError } from '../../utils/toastNotify';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export const RoomReport = () => {
    const authState = useSelector(selectAuth)
    const [room, setRoom] = useState({})
    const [attendanceHistory, setAttendanceHistory] = useState([])
    const [hoverRowIndex, setHoverRowIndex] = useState(-1)
    const params = useParams()
    const [togglePassword, setTogglePassword] = useState(false)
    function fetchRoom() {
        callApi(`room/${params.id}`, 'GET', {}, authState.token)
            .then((res) => {
                setRoom(res.data)
            })
            .catch((err) => {
                toastError(err.response.data.message)
            })
    }
    useEffect(() => {
        fetchRoom()
        getRoomReport()
    }, []);
    function getRoomReport() {
        callApi(`par/report/${params.id}`, 'GET', {}, authState.token)
            .then((res) => {
                setAttendanceHistory(res.data)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    function changeBackground(index) {
        setHoverRowIndex(index)
        // e.target.classList.add("is-selected")
    }
    function removeBackground() {
        setHoverRowIndex(-1)
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const selectTag = (currentDate, timeStart, timeEnd) => {
        const rawTimeStart = timeStart
        // console.log(rawTimeStart.getTime())
        const rawTimeEnd = timeEnd
        if (rawTimeStart <= currentDate <= rawTimeEnd) {
            return (
                <td><span className='tag is-info is-large'>Checking</span></td>
            )
        }
        else if (currentDate < rawTimeStart) {
            return (
                <td><span className='tag is-info is-large'>Wating</span></td>
            )
        }
        else if (currentDate > rawTimeEnd) {
            return (
                <td><span className='tag is-success is-large'>Completed</span></td>
            )
        }
    }
    return (
        <div>
            <div className="text-centered">
                <h1 className='is-size-1 has-text-centered'>{room.roomName}</h1>
            </div>
            <div className="mt-20">
                <div className="column is-10 m-auto">
                    <div className="columns">
                        <div className="column is-4 m-auto">
                            <h2>Admin: <span className='tag is-info is-small'>{room.adminName}</span></h2>
                            <h2>Participant Number: <span className='tag is-info is-small'>{room.participantNumber}</span></h2>
                        </div>
                        <div className="column is-3 m-auto">
                            <h2>Time Schedule: {room.timeSchedule || <span className='tag is-light is-small'> Undefined</span>} </h2>
                            <h2>Date Interval: {room.dateSchedule || <span className='tag is-light is-small'> Undefined</span>}</h2>
                        </div>
                        {room.isAdmin && (
                            <div className="column is-3 m-auto is-justify-content-space-around">
                                {togglePassword ? (
                                    <>
                                        <h2 className="is-inline">Password: {room.password || <span className='tag is-light is-small'> Undefined</span>}</h2>
                                        <button
                                            onClick={() => setTogglePassword(!togglePassword)}
                                            className='button is-primary is-small'><span className='icon'><ion-icon name="eye-off-outline"></ion-icon></span></button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="is-inline">Password: {room.password || <span className='tag is-light is-small'>
                                            {[...Array(10)].map((x, i) =>
                                                <span key={i} style={{ fontSize: "1rem" }}>&#8226;</span>)}</span>}</h2>
                                        <button
                                            onClick={() => setTogglePassword(!togglePassword)}
                                            className='button is-primary is-small'><span className='icon'><ion-icon name="eye-outline"></ion-icon></span></button>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* statistics */}
            {/* <table className='table mt-20 mb-10 is-bordered' style={{ margin: "auto" }}>
                <thead>
                    <th className='title'>Index</th>
                    <th className='title'>Name</th>
                    <th className='title'>Date Joined</th>
                    <th className='title'>Image Sample</th>
                    <th className='title'>Image Recently Checked</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Hoang Huy</td>
                        <td>15/2/2022</td>
                        <td>Image Sample</td>
                        <td>Image recently checked</td>
                    </tr>
                    <tr className='is-selected'>
                        <td>1</td>
                        <td>Hoang Huy</td>
                        <td>15/2/2022</td>
                        <td>Image Sample</td>
                        <td>Image recently checked</td>
                    </tr>
                </tbody>
            </table> */}
            <table className='table is-bordered has-text-centered' style={{ margin: "2rem auto 5rem auto" }}>
                {room.isAdmin ? (
                    <>
                        <thead>
                            <tr>
                                <th title='Index'>Index</th>
                                <th title='Time start'>Time Start</th>
                                <th title='Time End'>Time End</th>
                                <th title='NoCP'>checked Participant</th>
                                <th title='RoCP'>Ratio</th>
                                <th title='NoUP'>Unchecked Participant</th>
                                <th title='RoUP'>Ratio</th>
                                <th title='status'>Status</th>
                                <th title='status'>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceHistory.map((history, index) => {
                                {/* exclude the admin */ }
                                const participantNumber = room.participantNumber - 1
                                const checkedParticipantNumber = history.checkedParticipantNumber - 1
                                return (

                                    <tr key={index + 1}
                                        onMouseOver={() => changeBackground(index)}
                                        onMouseLeave={removeBackground}
                                        className={hoverRowIndex === index ? "is-selected" : ""}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{history.timeStart}</td>
                                        <td>{history.timeEnd}</td>
                                        <td >{checkedParticipantNumber}</td>
                                        <td>{checkedParticipantNumber * 100 / participantNumber}% </td>
                                        <td>{participantNumber - checkedParticipantNumber}</td>
                                        <td>{(participantNumber - checkedParticipantNumber) * 100 / participantNumber}%</td>
                                        {selectTag(currentDate, history.timeStart, history.timeEnd)}
                                        <td>
                                            <Link to={`history/${history.historyId}`}>
                                                View
                                            </Link>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </>

                ) : (
                    <>
                        <thead>
                            <tr>
                                <th title='Index'>Index</th>
                                <th title='Time start'>Time Start</th>
                                <th title='Time End'>Time End</th>
                                <th title='Checked Image'>Checked Image </th>
                                <th title='Is Present'>Is Present </th>
                                <th title='Room Status'>Room Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceHistory.map((history, index) => {
                                return (
                                    <tr key={index + 1}
                                        onMouseOver={() => changeBackground(index)}
                                        onMouseLeave={removeBackground}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{history.timeStart}</td>
                                        <td >{history.timeEnd}</td>
                                        <td><img
                                            className="image"
                                            style={{ width: "200px" }}
                                            src={`data:image/jpeg;base64,${history.encodedImage}`}
                                            alt="user-avatar"
                                        /></td>
                                        <td>{history.isPresent ? <span className='tag is-success is-large'>Checked</span> : <span className='tag is-error is-large'>Not Checked</span>}</td>
                                        {selectTag(currentDate, history.timeStart, history.timeEnd)}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>

                )}
            </table>

        </div>
    );
}