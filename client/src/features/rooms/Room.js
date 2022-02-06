import React, { useEffect } from 'react';
import "./room.css"

export const Room = (props) => {
    const { roomName, participantNumber, isAdmin, id, publicId } = props.room
    const onOpenEditModal = (id) => {
        props.onOpenEditModal(id)
    }
    const onOpenWarningModal = (id, type = "delete") => {
        props.onOpenWarningModal(id, type)
    }
    if (!isAdmin) {
        props.subcribeRoom(publicId)
    }
    // useEffect(() => {
    //     console.log(props.currentRoomCheckId)
    // }, [props.currentRoomCheckId]);
    return (
        <div className="course box level block" style={{ width: "350px", height: "217px" }}>
            <div className="title-div columns" style={{ paddingRight: "1rem" }}>
                <div className="column is-9">
                    <h1 className="title">{roomName}</h1>
                </div>
                {isAdmin && (
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
            <div className="course-icon">
                <div className="columns mgb-small">
                    {isAdmin && (
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
                        {isAdmin || props.checkStatus ? (
                            <button className="button is-primary level-right"
                                onClick={() => props.check(publicId)}
                            >
                                Thực hiện điểm danh
                            </button>
                        ) : (
                            <button className="button is-primary level-right" disabled>
                                Điểm danh
                            </button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
