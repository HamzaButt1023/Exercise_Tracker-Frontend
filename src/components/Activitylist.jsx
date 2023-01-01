import React, { useEffect, useState } from 'react'
import { CustomizeUi, Loadmore } from './Customize';
import swimming from '../assets/images/swimming.jpg'
import cycling from '../assets/images/cycling.jpg'
import walking from '../assets/images/walking.jpg'
import running from '../assets/images/running.jpg'
import hiking from '../assets/images/hiking.jpg'
import Card from './Card';
import Btn from './Btn';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVITES } from '../redux/commonExportor';

export default function Activitylist() {

    const authenticationID = localStorage.getItem('userT');
    const dispatch = useDispatch();
    const list = useSelector((state) => state.activity);

    const getExcersiseList = async () => {
        const requestPath = `http://localhost:5000/api/exercise/fetchallexercises`;
        const getList = await fetch(requestPath, {
            method: 'GET',
            headers: {
                'auth-token': authenticationID,
            }
        });
        const response = await getList.json();
        dispatch(ACTIVITES(response));
    }

    useEffect(() => {
        getExcersiseList();
    }, []);

    const noActivity = <div className="alert alert-warning rounded-0 border-0 fw-bold" role="alert">No Activity Performed.</div>;
    let counter = 0;
    const activityList = <div className="row gx-3 gy-3">{
        list.map((listitem, index) => {
            const { _id, name, description, activity, duration, date } = listitem;
            
            const customDate = new Date(date).toLocaleDateString({},
                { timeZone: "UTC", month: "short", day: "2-digit" })

            const imageDecider = (
                activity === "running" ? running : 
                    (activity === "bicycle") ? cycling :
                    (activity === "swim") ? swimming :
                        (activity === "walk") ? walking : hiking
                    );
            return (
                <div key={index} className='col-xs-6 col-md-4'>
                    <Card
                        activityDate={customDate}
                        activityTitle={activity}
                        activityDescription={description}
                        activityImage={imageDecider}
                        deleteID={_id}
                    />
                </div>
            )
        })}</div>;
    return (
        <React.Fragment>
            <div className='col-xs-12 col-sm-7 col-md-8 col-lg-9 px-sm-3 py-sm-5'>

                <div className='row'>
                    <div className='col-md-12 py-3'>
                        <h1 className='fw-bold'>Recently Performed Activities</h1>
                        <p>You have performed multiple activities in last month have a look on it.</p>
                    </div>
                </div>
                {
                    list.length > 0 ? activityList : noActivity
                }

            </div>
        </React.Fragment>
    )
}
