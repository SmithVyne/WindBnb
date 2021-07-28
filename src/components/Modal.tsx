import React, { ReactElement, useLayoutEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useRef } from 'react';
import { extractCities } from './utils';
import { Guests, Stays } from './App';
import { MdLocationOn } from 'react-icons/md';
import {Button} from 'antd';

const btnStyle = {
    padding: 0,
    width: 23,
    height: 23,
    borderRadius: 4,
    border: "1px solid #828282"
}

const CityOptions = ({stays, handleLocation}:{stays : [] | Stays[], handleLocation: ({ target }: any) => void }) => (
    <div className="cityOptions">
        {extractCities(stays).map(city => <div key={city} className="options" onClick={handleLocation}><MdLocationOn width={14} height={19.47} />{city}</div>)}
    </div>
);

const GuestOptions = ({handleGuests, guests}:{guests: Guests; handleGuests: (type:string, operation: string) => void;}) => (
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
)

interface Props {
    stays: [] | Stays[];
    typing: boolean;
    setTyping: React.Dispatch<React.SetStateAction<boolean>>;
    location: string;
    handleLocation: ({ target }: any) => void;
    totalGuests: number;
    guests: Guests;
    handleGuests: (type:string, operation: string) => void;
    isMobile: boolean
}

export default function Modal({stays, typing, setTyping, location, handleLocation, totalGuests, guests, handleGuests, isMobile}: Props): ReactElement {
    const locationRef = useRef<HTMLInputElement>(null);
    const [showCityOpns, setShowCityOpns] = useState<boolean>(true);

    useLayoutEffect(() => {
        typing && locationRef.current && locationRef.current.focus()
    }, [typing])

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
                    {isMobile && <div className="noti">Edit your search</div> }
                    <div className="filter-wrapper">
                        <div className="filter-lg">
                            <span onClick={() => setShowCityOpns(true)} className="borders">
                                <label>Location</label><input placeholder="Add location" ref={locationRef} value={location} onChange={handleLocation} type="text" />
                            </span>
                            {isMobile && <div className="mobile-border"></div>}
                            <span onClick={() => setShowCityOpns(false)} className="borders">
                                <label>Guests</label><input readOnly value={totalGuests ? `${totalGuests} guests` : ''} placeholder="Add guests" type="text" />
                            </span>
                            {isMobile || <span className="search-btn-lg"><span className="lg"><AiOutlineSearch size={22} color="#FFFFFF" /> Search</span></span>}
                        </div>
                        <div className="suggestions">
                            {isMobile ? (showCityOpns) ? <CityOptions stays={stays} handleLocation={handleLocation} /> : <GuestOptions guests={guests} handleGuests={handleGuests} />
                            :
                             (<>
                                <CityOptions stays={stays} handleLocation={handleLocation} />
                                <GuestOptions guests={guests} handleGuests={handleGuests} />
                            </>)}
                        </div>
                        {isMobile && <span className="lg"><AiOutlineSearch size={22} color="#FFFFFF" /> Search</span>}
                    </div>
                </motion.div>
            </motion.div>}
      </AnimatePresence>
    )
}
