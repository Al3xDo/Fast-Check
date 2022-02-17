import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { callApi } from '../../utils/apiCaller';
import { selectAuth } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { toastError } from '../../utils/toastNotify';
import { useParams } from 'react-router';
export const Room = () => {
    const authState = useSelector(selectAuth)
    const [room, setRoom] = useState({
        name: "Lập trình",
        participantNumber: 3,
        timeSchedule: "15:30",
        dateSchedule: "every 3 week",
        code: "123",
        password: "123"
    })
    const [attendanceHistory, setAttendanceHistory] = useState([])
    const params = useParams()
    // console.log(id)
    // function fetchRoom() {
    //     callApi(`rooms/room/${id}`, 'GET', {}, authState.token)
    //         .then((res) => {
    //             setRoom(res.data)
    //         })
    //         .catch((err) => {
    //             toastError(err.response.data.message)
    //         })
    // }
    useEffect(() => {
        getRoomReport()
    }, []);
    function getRoomReport() {
        callApi(`room/report/${params.id}`, 'GET', {}, authState.token)
            .then((res) => {
                setAttendanceHistory(res.data)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    return (
        <div>
            <div className="text-centered">
                <h1 className='is-size-1 has-text-centered'>{room.name}</h1>
            </div>
            <div className="columns mt-20 m-auto">
                <div className="column">
                    <h2>Admin: </h2>
                    <h2>Participant Number: {room.participantNumber}</h2>
                </div>
                <div className="column">
                    <h2>Time Schedule: {room.timeSchedule} </h2>
                    <h2>Date Interval: {room.dateSchedule}</h2>
                </div>
                <div className="column">
                    <h2>Code: {room.code} </h2>
                    <h2>Password: {room.password}</h2>
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
            <table className='table mt-20 mb-10 is-bordered' style={{ margin: "auto" }}>
                <thead>
                    <tr>

                        <th title='Index'>Index</th>
                        <th title='Room name'>Room name</th>
                        <th title='Time start'>Time Start</th>
                        <th title='Time End'>Time End</th>
                        <th title='NoP'>Participant Number</th>
                        <th title='NoCP'>checked Participant</th>
                        <th title='RoCP'>Ratio</th>
                        <th title='NoUP'>Unchecked Participant</th>
                        <th title='RoUP'>Ratio</th>
                        <th title='status'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceHistory.map((history, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{history.roomName}</td>
                                <td>{history.timeStart}</td>
                                <td>{history.timeEnd}</td>
                                <td>{history.participantNumber}</td>
                                <td>2</td>
                                <td>0.75</td>
                                <td>1</td>
                                <td>0.25</td>
                                <td>Completed</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}