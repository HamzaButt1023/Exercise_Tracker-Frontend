import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteActivity } from './Customize';

import { DELETEACTIVITY } from '../redux/commonExportor';


export default function Delete_activity(props) {

  const { closedDeleteBox, deleteId } = props;
  const { deleteBg, backgroundColor, confirmBtn, confirmationText, confirmBtnhover, cancelBtn } = DeleteActivity;
  const [hoverOn, sethoverOn] = useState(confirmBtn);

  const onMouseE = () => sethoverOn(confirmBtnhover);
  const onMouseO = () => sethoverOn(confirmBtn);

  const authenticationID = localStorage.getItem('userT');
  const dispatch = useDispatch();
  const list = useSelector((state) => state.activity);


  const deleteExcerise = async () => {
    const requestPath = `http://localhost:5000/api/exercise/deleteexercise/${deleteId}`;
    const getList = await fetch(requestPath, {
      method: 'DELETE',
      headers: {
        'auth-token': authenticationID,
        'content-type': "application/json"
      }
    });
    const response = await getList.json();

    if (response.success) {
      const newList = list.filter((element) => element._id !== deleteId);
      dispatch(DELETEACTIVITY(newList));
      closedDeleteBox();
    }
  }
  const confirmedtoDelete = () => {
    deleteExcerise();
  }

  return (
    <React.Fragment>
      <div className='vw-100 vh-100 position-fixed start-0 top-0 z-n1 d-flex justify-content-center align-items-center' style={deleteBg}>
        <div className='bg-white w-sm-25  px-5 py-5'>
          <p className='fw-bold fs-6' style={confirmationText}>Are you sure you want to delete this activity</p>
          <div className='d-flex justify-content-end'>
            <span className='me-3 px-2 py-2 border confirmationBtn'
              onMouseEnter={onMouseE}
              onMouseOut={onMouseO}
              onClick={confirmedtoDelete}
              style={hoverOn}>Confirm</span>
            <span className='px-2 py-2' onClick={() => closedDeleteBox()} style={cancelBtn}>Cancel</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
