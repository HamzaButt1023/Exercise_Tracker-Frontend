import React from 'react'
import { CustomizeUi, Loadmore } from './Customize';
import swimming from '../assets/images/swimming.png'
import Card from './Card';
import Btn from './Btn';

export default function Activitylist() {
    return (
        <React.Fragment>
            <div className='col-xs-12 col-sm-7 col-md-8 col-lg-9 px-sm-3 py-sm-5'>

                <div className='row'>
                    <div className='col-md-12 py-3'>
                        <h1 className='fw-bold'>Recently Performed Activities</h1>
                        <p>You have performed multiple activities in last month have a look on it.</p>
                    </div>
                </div>
                {/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZDQwZGU0MmQxN2NlMTg1MTgwNWEwIn0sImlhdCI6MTY3MjI5ODcxOH0.ry-amUwpBCE2diSmuiL9yJrKYwTvJbkl2kuMeXk-xzA */}
                <div className='row gx-3 gy-3'>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                </div>

                <div className='row gx-3 gy-3 mt-4'>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                    <div className='col-xs-6 col-md-4'>
                        <Card
                            activityDate="24 Apr"
                            activityTitle="Swimming"
                            activityDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime molestias quam, perferendis dolores minima eos debitis ut consequatur sapiente excepturi quisquam quaerat odio commodi cupiditate quidem tempore eaque blanditiis rerum!"
                            activityImage={swimming}
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <Btn title="Load More" style={Loadmore} />
                </div>

            </div>
        </React.Fragment>
    )
}
