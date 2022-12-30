import React from 'react'
import { Link } from 'react-router-dom';
import { orangeColor } from './Customize';

export default function Redirectlink(props) {

    const { longtext, pathAddress, pathTag } = props;
    return (
        <React.Fragment>
            <span className="d-block fw-semibold text-decoration-none mt-2">{longtext}<Link className="ms-1 text-decoration-none" style={{ color: orangeColor }} to={pathAddress}>{pathTag}</Link></span>
        </React.Fragment>
    )
}
