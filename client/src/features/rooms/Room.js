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
        <div className="course box level block" style={{ width: "350px", height: "217px" }}>
            <div className="title-div columns" style={{ paddingRight: "1rem" }}>
                <div className="column is-9">
                    <h1 className="title">{roomName}</h1>
                </div>
                {isAdmin !== 0 && (
                    <div className="column">
                        <ion-icon name="ellipsis-vertical-outline"
                            onClick={() => onOpenEditModal(id)}
                        ></ion-icon>
                    </div>
                )}
                {isAdmin ? (
                    <div className="column">
                        <ion-icon name="trash-outline"
                            onClick={() => onOpenWarningModal(id)}
                        ></ion-icon>
                    </div>
                ) : (
                    <div className="column is-1">
                        <ion-icon name="log-out-outline"
                            onClick={() => onOpenWarningModal(publicId, "out")}
                        ></ion-icon>
                    </div>
                )}

            </div>

            <div className="course-description">
                <h2>Sĩ số: {participantNumber}</h2>
                {/* <h2>Time: {timeEnd} - {timeStart}</h2> */}
                {/* <h2>Class size: 52</h2> */}
            </div>
            <Link to={`room/${publicId}`}>
                <button className='button is-primary'>
                    create report
                </button>
            </Link>
            <div className="course-icon">
                <div className="columns mgb-small">
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
                                    Đang điểm danh
                                </button>
                            ) : (
                                <button className="button is-primary level-right"
                                    onClick={() => props.onOpenAttendanceModal(publicId)}
                                >
                                    Thực hiện điểm danh
                                </button>
                            )
                        ) : (
                            <Link to={{ pathname: '/checking', attendanceStatusId: statusId }}>
                                <button
                                    className="button is-primary level-right"
                                    disabled={!openButton(statusId, isPresent)}
                                    onClick={props.onCheckAttendance}
                                >
                                    Điểm danh
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
