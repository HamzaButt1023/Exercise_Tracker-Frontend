import React, { useState } from 'react'
import { CustomizeCard } from './Customize';
import Delete_activity from './Delete_activity';

import editicon from '../assets/icons/pen-solid.svg';
import deleteicon from '../assets/icons/trash-can-solid.svg';
import { Link } from 'react-router-dom';

export default function Card(props) {

    const [deleteCall, setDeleteCall] = useState(false);

    const closedDeleteBox = () => setDeleteCall(false);
    const openDeleteBox = () => setDeleteCall(true);

    const { cardShade, date, cardIcon, cardImage } = CustomizeCard;
    const { activityDate, activityTitle, activityDescription, activityImage,deleteID } = props;
    return (
        <React.Fragment>
            <div className='fitprism-card' style={cardShade}>
                <div className='fitprism-card-header py-3 px-2 d-flex align-items-center justify-content-between'>

                    <div className='d-flex align-items-center justify-content-between'>
                        <span className='text-white d-flex justify-content-center align-items-center text-break px-2' style={date}>{activityDate}</span>
                        <span className='ms-3 fw-bold fs-4 text-capitalize'>{activityTitle}</span>
                    </div>

                    <div className=''>
                        <Link to={`/edit-activity/${deleteID}`}>
                            <img className='me-2' style={cardIcon} src={editicon} title="Edit Your Activity" alt="Edit Icon" /></Link>
                        <img src={deleteicon} style={cardIcon} alt="Delete Icon" title="Delete Your Activity" onClick={openDeleteBox} />
                    </div>

                </div>

                <div className='fitprism-card-image'>
                    <img src={activityImage} alt="swimming" style={cardImage} />
                </div>

                <div className='fitprism-description py-3 px-2'>
                    <p className='text-justify m-0'>{activityDescription}</p>
                </div>
            </div>
            {deleteCall && <Delete_activity deleteId={deleteID} closedDeleteBox={closedDeleteBox} />}

        </React.Fragment>
    )
}
