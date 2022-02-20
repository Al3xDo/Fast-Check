import React, { useEffect } from 'react';
import { toastInfo } from '../../utils/toastNotify';
import "./room.css"
import { Link } from 'react-router-dom';

export const Room = (props) => {
    const { roomName, participantNumber, isAdmin, id, publicId, statusId, isPresent } = props.room
    const onOpenEditModal = (id) => {
        props.onOpenEditModal(id)
    }
    const onOpenWarningModal = (id, type = "delete") => {
        props.onOpenWarningModal(id, type)
    }
    if (!isAdmin) {
        props.subcribeRoom(publicId)
    }
    useEffect(() => {
        if (props.currentRoomCheckId === publicId) {
            toastInfo("Room has started checking attendance")
        }
    }, [props.currentRoomCheckId]);
    const openButton = (statusId, isPresent) => {
        if (statusId !== null) {
            if (isPresent === null || isPresent === 0) return true
            return false
        }
        return false
    }
    return (
        <div className="course box level block" style={{ width: "370px", height: "217px" }}>
            <div className="title-div columns" style={{ paddingRight: "1.1rem" }}>
                <div className="column is-9">
                    <h1 className="title">{roomName}</h1>
                </div>
                {isAdmin !== 0 && (
                    <div className="column">
                        <button className='button is-small' onClick={() => onOpenEditModal(id)}>
                            <span className='icon' title='Edit Room'>
                                <ion-icon name="ellipsis-vertical-outline"
                                    style={{ pointerEvents: "none" }}
                                ></ion-icon>
                            </span>
                        </button>
                    </div>
                )}
                {isAdmin ? (
                    <div className="column">
                        <button className='button is-small' onClick={() => onOpenWarningModal(id)}>
                            <span className='icon' title='Delete Room'>
                                <ion-icon name="trash-outline"
                                    style={{ pointerEvents: "none" }}
                                ></ion-icon>
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="column is-1">
                        <button className='button is-small' onClick={() => onOpenWarningModal(publicId, "out")}>
                            <span className='icon' title='Out Room'>
                                <ion-icon name="log-out-outline"
                                    style={{ pointerEvents: "none" }}
                                ></ion-icon>
                            </span>
                        </button>

                    </div>
                )}

            </div>

            <div className="course-description">
                <h2>Number: {participantNumber}</h2>
                {/* <h2>Time: {timeEnd} - {timeStart}</h2> */}
                {/* <h2>Class size: 52</h2> */}
            </div>

            <div className="course-icon">
                <div className="columns mgb-small">
                    <div className="column">
                        <Link to={`/room/${publicId}`}>
                            <button className='button'>
                                <span className="icon" title="See Report">
                                    <ion-icon name="document-text-outline" style={{ fontSize: "20px", pointerEvents: "none" }}></ion-icon>
                                </span>
                            </button>
                        </Link>
                    </div>
                    {isAdmin !== 0 && (
                        <div className="column">
                            <button className="button"
                                onClick={() => props.onOpenInviteModal(publicId)}
                            >
                                <span className="icon is-small">
                                    <ion-icon name="share-social-outline"></ion-icon>
                                </span>
                            </button>
                        </div>
                    )}
                    <div className="column">
                        {isAdmin ? (
                            statusId !== null ? (
                                <button className="button is-primary level-right"
                                    disabled
                                >
                                    Checking Attendance
                                </button>
                            ) : (
                                <button className="button is-primary level-right"
                                    onClick={() => props.onOpenAttendanceModal(publicId)}
                                >
                                    Open Attendance Check
                                </button>
                            )
                        ) : (
                            <Link to={{ pathname: '/checking', attendanceStatusId: statusId }}>
                                <button
                                    className="button is-primary level-right"
                                    disabled={!openButton(statusId, isPresent)}
                                    onClick={props.onCheckAttendance}
                                >
                                    Check Attendance
                                </button>
                            </Link>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
