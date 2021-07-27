import React, { ReactElement, useLayoutEffect } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useRef } from 'react';
import { extractCities } from './utils';
import { Guests, Stays } from './App';
import { MdLocationOn } from 'react-icons/md';
import {Button} from 'antd';

interface Props {
    stays: [] | Stays[];
    typing: boolean;
    setTyping: React.Dispatch<React.SetStateAction<boolean>>;
    location: string;
    handleLocation: ({ target }: any) => void;
    totalGuests: number;
    guests: Guests;
    handleGuests: (type:string, operation: string) => void;
}

export default function Modal({stays, typing, setTyping, location, handleLocation, totalGuests, guests, handleGuests}: Props): ReactElement {
    const locationRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        typing && locationRef.current && locationRef.current.focus()
    }, [typing])

    const btnStyle = {
        padding: 0,
        width: 23,
        height: 23,
        borderRadius: 4,
        border: "1px solid #828282"
    }

    return (
        <AnimatePresence>
        {typing && 
            <motion.div
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onMouseOver={() => setTyping(false)}
            onClick={() => setTyping(false)} className="modalWrapper">
                <motion.div onMouseOver={(e:any) => e.stopPropagation()} onClick={(e:any) => e.stopPropagation()} className="modal">
                <div className="filter-wrapper">
                    <div className="filter-lg">
                        <span className="borders"><label>Location</label><input placeholder="Add location" ref={locationRef} value={location} onChange={handleLocation} type="text" /></span>
                        <span className="borders"><label>Guests</label><input value={totalGuests ? `${totalGuests} guests` : ''} placeholder="Add guests" type="text" /></span>
                        <span className="search-btn-lg"><span className="lg"><AiOutlineSearch size={22} color="#FFFFFF" /> Search</span></span>
                    </div>
                    <div className="suggestions">
                        <div className="cityOptions">
                            {extractCities(stays).map(city => <div className="options" onClick={handleLocation}><MdLocationOn width={14} height={19.47} />{city}</div>)}
                        </div>
                        <div className="guestOptions">
                            <div>
                                <span className="title">Adults</span>
                                <label>Ages 13 or above</label>
                                <span className="guestSlider">
                                    <Button style={btnStyle} onClick={() => handleGuests("adults", "-")} icon={<AiOutlineMinus size={15} color="#828282" />} />
                                    {guests.adults}
                                    <Button style={btnStyle} onClick={() => handleGuests("adults", "+")} icon={<AiOutlinePlus size={15} color="#828282" />} />
                                </span>
                            </div>

                            <div>
                                <span className="title">Children</span>
                                <label>Ages 2 - 12</label>
                                <span className="guestSlider">
                                    <Button style={btnStyle} onClick={() => handleGuests("children", "-")} icon={<AiOutlineMinus size={15} color="#828282" />} />
                                    {guests.children}
                                    <Button style={btnStyle} onClick={() => handleGuests("children", "+")} icon={<AiOutlinePlus size={15} color="#828282" />} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                </motion.div>
            </motion.div>}
      </AnimatePresence>
    )
}
