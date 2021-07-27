import React, { ReactElement, useLayoutEffect, useRef } from 'react';
import logo from '../logo.svg';
import {AiOutlineSearch} from 'react-icons/all';

interface Props {
    setTyping: React.Dispatch<React.SetStateAction<boolean>>;
    location: string;
    handleLocation: ({ target }: any) => void;
    totalGuests:number
}

export default function Nav({setTyping, location, handleLocation, totalGuests}: Props): ReactElement {
    const locationRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        locationRef.current && locationRef.current.focus()
    }, [])

    return (
        <nav>
            <a href='/'><img className='siteLogo' alt="logo" src={logo} /></a>
            <div className="filter">
                <input onMouseOver={() => setTyping(true)} value={location} ref={locationRef} className="location" onChange={handleLocation} placeholder="Add location" />
                <input onMouseOver={() => setTyping(true)} value={totalGuests ? `${totalGuests} guests` : ''} className="guests" placeholder="Add guests" />
                <span className="search-btn"><AiOutlineSearch size={22} color="#EB5757" /></span>
            </div>
        </nav>
    )
}
