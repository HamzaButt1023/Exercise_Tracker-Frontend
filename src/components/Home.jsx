import React, { useEffect } from 'react'
import Activitylist from './Activitylist';
import Menubar from './Menubar';
import Sidebar_left from './Sidebar_left';
import { useSelector } from "react-redux";

export default function Home() {
    
    return (
        <React.Fragment>
            <Menubar />
            <div className='container-fluid'>
                <div className='row'>
                    <Sidebar_left />
                    <Activitylist />
                </div>
            </div>

        </React.Fragment >
    )
}