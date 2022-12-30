import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { MENUOPEN } from '../redux/commonExportor';


export default function Menubar(props) {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <header className='w-100 d-sm-none  px-3 py-2 text-end fw-bold fs-1 text-white fitprism-menu-header' style={{
                background: "#F15A24",
                cursor: 'pointer'
            }}><a onClick={() => dispatch(MENUOPEN())}>MENU</a></header>
        </React.Fragment>
    )
}
