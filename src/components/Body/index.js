import React from 'react';
import { Row, Col } from 'antd';
import {AiFillStar} from 'react-icons/all';

const capitalize = (word) => (word[0].toUpperCase() + word.slice(1)) 

function Body({stays, location}) {
    return (
        <main>
            <div className="title-section">
            <h1>{location[0] ? `Stays in ${capitalize(location[0])} ${location[1] ? `, ${capitalize(location[1])}` : ''}` : 'All Stays'}</h1>
            <span>{`${stays.length ? `${stays.length}+` : stays.length} stays`}</span>
            </div>
            <Row gutter={[32, 32]}>
            {stays.map(stay => (
                <Col style={{cursor: "pointer"}} md={8} key={stay.beds}>
                <div className="stay-img" style={{backgroundImage: `url(${stay.photo})`}}></div>
                <div className='stay-desc'>
                    {stay.superHost && <span className='superhost'>SUPER HOST</span>}
                    <span className='stay-type'>{stay.type}
                    <span><AiFillStar size={15.6} color="#EB5757" /> {stay.rating}</span>
                    </span>
                </div>
                <div className='stay-title'>
                    {stay.title}
                </div>
                </Col>
            ))}
            </Row>
        </main>
    )
}

export default Body;
