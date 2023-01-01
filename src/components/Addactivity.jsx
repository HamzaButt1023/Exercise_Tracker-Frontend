import React, { useState } from 'react'
import Menubar from './Menubar';
import Sidebar_left from './Sidebar_left';
import { CustomizeUi, globalFieldRules, newActivity } from './Customize';

import swim from '../assets/icons/person-swimming-solid.svg';
import cycle from '../assets/icons/bicycle-solid.svg';
import runing from '../assets/icons/person-running-solid.svg';
import hike from '../assets/icons/person-hiking-solid.svg';
import walk from '../assets/icons/person-walking-solid.svg';

import Btn from "./Btn";
import { useNavigate } from "react-router-dom";

export default function Addactivity() {

    const Navigate = useNavigate();
    const [activity, setActivity] = useState({
        activityName: "",
        activityDescription: "",
        activityType: "",
        activityTime: "",
        activityDate: "",
    });

    const [successA, setsuccessA] = useState(false);
    const clearForm = () => {
        document.getElementById("ActivityForm").reset();
    }
    const { activityDate, activityDescription, activityName, activityTime, activityType } = activity;
    const addActivity = (e) => {
        e.preventDefault();
        const authenticationID = localStorage.getItem('userT');
        fetch("http://localhost:5000/api/exercise/addexercise", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authenticationID
            },
            body: JSON.stringify({
                name: activityName,
                description: activityDescription,
                activity: activityType,
                duration: activityTime
            })
        }).then(response => response.json())
            .then(data => {
                const { success } = data;
                if (data) {
                    clearForm();
                    setActivity({
                        activityName: "",
                        activityDescription: "",
                        activityType: "",
                        activityTime: "",
                        activityDate: "",
                    })
                    setsuccessA(true);

                    setTimeout(() => {
                        Navigate("/home");
                    }, 3000);
                }
            })
    }

    const nameHandler = (e) => {
        setActivity({ ...activity, activityName: e.target.value });
    }

    const descriptHandler = (e) => {
        setActivity({ ...activity, activityDescription: e.target.value });
    }

    const radioHandler = (e) => {
        setActivity({ ...activity, activityType: e.target.value });
    }
    const timeHandler = (e) => {
        setActivity({ ...activity, activityTime: e.target.value });
    }
    const dateHandler = (e) => {
        setActivity({ ...activity, activityDate: e.target.value });
    }

    return (
        <React.Fragment>
            <Menubar />
            <div className='container-fluid'>
                <div className='row'>
                    <Sidebar_left />
                    <div className='col-xs-12 col-sm-7 col-md-8 col-lg-9 px-sm-3 py-5 d-flex flex-column justify-content-center justify-content-sm-start'>

                        <div className='row'>
                            <div className='col-md-12 py-3'>
                                <h1 className='fw-bold text-capitalize'>Add new activity</h1>
                                <p>Elit aliqua exercitation aliqua sit aute.</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                {
                                    successA && <div className="alert alert-success rounded-0 border-0 fw-bold" role="alert">
                                        Activity Add Successfully
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-xs-12 col-md-6'>
                                <form id="ActivityForm" onSubmit={addActivity} className="mt-3">

                                    <div className="mb-3">
                                        <input type="text" value={activityName} className={globalFieldRules}
                                            id="" placeholder="Enter name" onChange={nameHandler} required />
                                    </div>

                                    <div className="mb-3">
                                        <textarea className='form-control border-0 rounded-0 border-bottom' placeholder="Activity description" onChange={descriptHandler} rows={5} value={activityDescription} required></textarea>
                                    </div>
                                    <div className="mb-3 customizeRadio">

                                        <input className='d-none' type="radio" value="running" id="run" name="activitytype" onChange={radioHandler} />

                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='run'><img src={runing} style={newActivity.iconsize} alt="running" /><span className='ms-1'>Running</span></label>

                                        <input className='d-none' type="radio" value="bicycle" id="bicycle" name="activitytype" onChange={radioHandler} />

                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='bicycle'><img src={cycle} style={newActivity.iconsize} alt="bicycle" /><span className='ms-1'>Bicycle Ride</span> </label>

                                        <input className='d-none' type="radio" value="swim" id="swim" name="activitytype" onChange={radioHandler} />
                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='swim'><img src={swim} style={newActivity.iconsize} alt="swimming" /><span className='ms-1'>swim</span> </label>

                                        <input className='d-none' type="radio" value="hike" id="hike" name="activitytype" onChange={radioHandler} />
                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='hike'><img src={hike} style={newActivity.iconsize} alt="Hiking" /><span className='ms-1'>hike</span> </label>

                                        <input className='d-none' type="radio" value="walk" id="walk" name="activitytype" onChange={radioHandler} />
                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='walk'><img src={walk} style={newActivity.iconsize} alt="Walking" /><span className='ms-1'>walk</span> </label>


                                    </div>
                                    <div className="mb-3">
                                        <input type="number" placeholder='Time in Mins' className={globalFieldRules}
                                            id="" onChange={timeHandler} required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="date" className={globalFieldRules}
                                            id="" name="date" onChange={dateHandler} required />
                                    </div>

                                    <Btn title="Add New" style={CustomizeUi.btn} />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
