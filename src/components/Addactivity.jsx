import React from 'react'
import Menubar from './Menubar';
import Sidebar_left from './Sidebar_left';
import { CustomizeUi, globalFieldRules, newActivity } from './Customize';

import swim from '../assets/icons/person-swimming-solid.svg';
import cycle from '../assets/icons/bicycle-solid.svg';
import runing from '../assets/icons/person-running-solid.svg';
import hike from '../assets/icons/person-hiking-solid.svg';

import Btn from "./Btn";
export default function Addactivity() {

    const addActivity = (e) => {
        e.preventDefault();
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
                            <div className='col-xs-12 col-md-6'>
                                <form onSubmit={addActivity} className="mt-3">

                                    <div className="mb-3">
                                        <input type="text" className={globalFieldRules}
                                            id="" placeholder="Enter name" required />
                                        <div className="form-text text-danger text-lowercase"></div>
                                    </div>

                                    <div className="mb-3">
                                        <textarea className='form-control border-0 rounded-0 border-bottom' placeholder="Activity description" rows={5} required></textarea>
                                    </div>

                                    <div className="mb-3 customizeRadio">

                                        <input className='d-none' type="radio" value="running" id="run" name="activitytype" checked />

                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='run'><img src={runing} style={newActivity.iconsize} alt="running" /><span className='ms-1'>Running</span></label>

                                        <input className='d-none' type="radio" value="bicycle" id="bicycle" name="activitytype" />


                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='bicycle'><img src={cycle} style={newActivity.iconsize} alt="bicycle" /><span className='ms-1'>Bicycle Ride</span> </label>

                                        <input className='d-none' type="radio" value="swim" id="swim" name="activitytype" />
                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='swim'><img src={swim} style={newActivity.iconsize} alt="bicycle" /><span className='ms-1'>swim</span> </label>

                                        <input className='d-none' type="radio" value="walkhike" id="walkhike" name="activitytype" />
                                        <label className='me-2 border px-1 py-1 text-capitalize d-inline-flex align-items-center' htmlFor='walkhike'><img src={hike} style={newActivity.iconsize} alt="bicycle" /><span className='ms-1'>walk and hike</span> </label>

                                    </div>

                                    <div className="mb-3">
                                        <input type="time" className={globalFieldRules}
                                            id="" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="date" className={globalFieldRules}
                                            id="" required />
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
