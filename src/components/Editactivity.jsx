import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Menubar from './Menubar';
import Sidebar_left from './Sidebar_left';
import { CustomizeUi, globalFieldRules, newActivity } from './Customize';

import swim from '../assets/icons/person-swimming-solid.svg';
import cycle from '../assets/icons/bicycle-solid.svg';
import runing from '../assets/icons/person-running-solid.svg';
import hike from '../assets/icons/person-hiking-solid.svg';
import walk from '../assets/icons/person-walking-solid.svg';

import Btn from "./Btn";
import { useDispatch, useSelector } from 'react-redux';

export default function Editactivity() {

    const { id } = useParams();
    const Navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    const lists = useSelector((state) => state.activity);
    const item = lists.find((element) => element._id == id);
    const { _id, name, description, activity, duration, date } = item;

    const clearForm = () => {
        document.getElementById("resetForm").reset();
    }

    const [aactivity, setActivity] = useState({
        activityName: "",
        activityDescription: "",
        activityType: "",
        activityTime: "",
        activityDate: "",
    });

    const { activityDate, activityDescription, activityName, activityTime, activityType } = aactivity;

    const nameHandler = (e) => {
        setActivity({ ...aactivity, activityName: e.target.value });
    }

    const descriptHandler = (e) => {
        setActivity({ ...aactivity, activityDescription: e.target.value });
    }

    const radioHandler = (e) => {
        setActivity({ ...aactivity, activityType: e.target.value });
    }
    const timeHandler = (e) => {
        setActivity({ ...aactivity, activityTime: e.target.value });
    }
    const [successA, setsuccessA] = useState(false);
    const editActivity = (e) => {
        e.preventDefault();
        const authenticationID = localStorage.getItem('userT');
        fetch(`http://localhost:5000/api/exercise/updateexercise/${id}`, {
            method: 'PUT',
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
                    setsuccessA(true);
                    setTimeout(() => {
                        Navigate("/home");
                    }, 3000);
                }
            })
    }

    const radio = [
        {
            value: "running",
            id: "run",
            alt: "running",
            title: "Running",
            src: runing
        },
        {
            value: "bicycle",
            id: "bicycle",
            alt: "bicycle",
            title: "Bicycle Ride",
            src: cycle
        },
        {
            value: "swim",
            id: "swim",
            alt: "swim",
            title: "Swimming",
            src: swim
        },
        {
            value: "hike",
            id: "hike",
            alt: "hiking",
            title: "Hike",
            src: hike
        },
        {
            value: "walk",
            id: "walk",
            alt: "walking",
            title: "walk",
            src: walk
        }
    ]

    const radioRender = radio.map((radioitem, index) => {
        const defaultCHk = radioitem.value == activity ? true : false;
        return (
            <React.Fragment key={index}>
                <input className='d-none' defaultChecked={defaultCHk} type="radio" value={radioitem.value} id={radioitem.id} name="activitytype" onChange={radioHandler} />
                <label key={index} className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor={radioitem.id}><img src={radioitem.src} style={newActivity.iconsize} alt={radioitem.alt} /><span className='ms-1'>{radioitem.title}</span> </label>
            </React.Fragment>
        )
    })

    useEffect(() => {
        setActivity({
            activityName: name,
            activityDescription: description,
            activityType: activity,
            activityTime: duration
        })
    }, [])

    return (
        <React.Fragment>

            <Menubar />
            <div className='container-fluid'>
                <div className='row'>
                    <Sidebar_left />
                    <div className='col-xs-12 col-sm-7 col-md-8 col-lg-9 px-sm-3 py-5 d-flex flex-column justify-content-center justify-content-sm-start'>

                        <div className='row'>
                            <div className='col-md-12 py-3'>
                                <h1 className='fw-bold text-capitalize'>Edit Activity</h1>
                                <p>Elit aliqua exercitation aliqua sit aute.</p>
                            </div>
                        </div>
                        {successA &&
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="alert alert-success rounded-0 border-0 fw-bold" role="alert">
                                        Activity Update Successfully
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='row'>
                            <div className='col-xs-12 col-md-6'>
                                <form id="resetForm" onSubmit={editActivity} className="mt-3">

                                    <div className="mb-3">
                                        <input type="text" value={activityName} className={globalFieldRules}
                                            id="" placeholder="Enter name" onChange={nameHandler} required />
                                    </div>

                                    <div className="mb-3">
                                        <textarea className='form-control border-0 rounded-0 border-bottom' placeholder="Activity description" onChange={descriptHandler} rows={5} value={activityDescription} required></textarea>
                                    </div>
                                    <div className="mb-3 customizeRadio">{radioRender}</div>
                                    <div className="mb-3">
                                        <input type="number" placeholder='Time in Mins' className={globalFieldRules} value={activityTime}
                                            id="" onChange={timeHandler} required />
                                    </div>

                                    <Btn title="Edit activity" style={CustomizeUi.btn} />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
