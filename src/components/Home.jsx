import React from 'react'
import Activitylist from './Activitylist';
import Menubar from './Menubar';
import Sidebar_left from './Sidebar_left';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function Home() {
    const isLoggedIn = useSelector((state) => state.authentication.isLoggedin);
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