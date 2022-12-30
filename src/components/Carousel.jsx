import React from 'react'
import './css/carousel.css';

import slideOne from '../assets/images/fitprism-slider-01.png';
import slideTwo from '../assets/images/fitprism-slider-02.jpg';
import slideThree from '../assets/images/fitprism-slider-03.png';

export default function Carousel() {
    return (
        <React.Fragment>
            <div className="col-lg-7 p-0 d-none d-md-block">
                <div id="fitprism_carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#fitprism_carousel" data-bs-slide-to="0"
                             aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#fitprism_carousel" data-bs-slide-to="1"
                            aria-label="Slide 2" className="active"></button>
                        <button type="button" data-bs-target="#fitprism_carousel" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img src={slideOne} className="d-block min-vh-100  w-100"
                                alt="fitprism motivation team" />
                        </div>
                        <div className="carousel-item active">
                            <img src={slideTwo} className="d-block min-vh-100 w-100"
                                alt="stamina game" />
                        </div>
                        <div className="carousel-item">
                            <img src={slideThree} className="d-block min-vh-100 w-100"
                                alt="coach" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
