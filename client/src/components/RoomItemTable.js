import React from 'react';

const RoomItemTable = (props) => {
    const {index,name,participantNumber} = props
    return (
        <tr>
            <th>{index+1}</th>
            <td>{name}</td>
            {/* <td>15/07/2021 - 18/07/2022</td> */}
            <td>{participantNumber}</td>
            <td>
                <div className="button is-info">
                    Xem
                </div>
            </td>
        </tr>
    );
}

export default RoomItemTable;
