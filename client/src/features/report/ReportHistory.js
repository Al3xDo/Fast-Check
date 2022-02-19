import React, { useEffect, useState } from 'react';
import { callApi } from '../../utils/apiCaller';
import { selectAuth } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { toastError } from '../../utils/toastNotify';
import { useParams } from 'react-router';
export const ReportHistory = () => {
    const authState = useSelector(selectAuth)
    const [attendanceHistory, setAttendanceHistory] = useState([])
    const params = useParams()
    // function fetchRoom() {
    //     callApi(`par/${params.id}`, 'GET', {}, authState.token)
    //         .then((res) => {
    //             setRoom(res.data)
    //         })
    //         .catch((err) => {
    //             toastError(err.response.data.message)
    //         })
    // }
    useEffect(() => {
        // fetchRoom()
        getRoomReport()
    }, []);
    function getRoomReport() {
        callApi(`par/report_status/${params.id}`, 'GET', {}, authState.token)
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
                <h1 className='is-size-1 has-text-centered'>Attendance History Report</h1>
            </div>
            <div className="mt-20" style={{ marginLeft: "7rem" }}>
                {/* <div className="columns">
                    <div className="column is-5">
                        <h2>Time Start: <span className='tag is-info is-small'>{attendanceHistory[0].timeStart}</span></h2>
                    </div>
                    <div className="column is-5">
                        <h2>Time End: <span className='tag is-info is-small'>{attendanceHistory[0].timeEnd}</span></h2>
                    </div>
                </div> */}
            </div>
            <table className='table is-bordered has-text-centered' style={{ margin: "2rem auto 5rem auto" }}>

                <>
                    <thead>
                        <tr>
                            <th title='Index'>Index</th>
                            <th title='Time start'>User Email</th>
                            <th title='Time End'>User Name</th>
                            <th title='Is Present'>Is Present </th>
                            <th title='Is Present'>Checked Image </th>
                            <th title='Is Present'>Sample Image </th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory.map((history, index) => {
                            return (


                                <tr key={index + 1}
                                >
                                    <td>{index + 1}</td>
                                    <td>{history.userEmail}</td>
                                    <td >{history.userName}</td>
                                    <td><img
                                        className="image"
                                        style={{ width: "200px" }}
                                        src={`data:image/jpeg;base64,${history.encodedImage}`}
                                        alt="user-avatar"
                                    /></td>
                                    <td><img
                                        className="image"
                                        style={{ width: "200px" }}
                                        src={`data:image/jpeg;base64,${history.encodedSampleImage}`}
                                        alt="user-avatar"
                                    /></td>
                                    <td>{history.isPresent ? <span className='tag is-success is-large'>Checked</span> : <span className='tag is-error is-large'>Not Checked</span>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </>
            </table>

        </div>
    );
}