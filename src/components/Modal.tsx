import React, { ReactElement, useLayoutEffect, useMemo } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRef } from 'react';
import { extractCities } from './utils';
import { Stays } from './App';
import { MdLocationOn } from 'react-icons/md';

interface Props {
    stays: [] | Stays[];
    typing: boolean;
    setTyping: React.Dispatch<React.SetStateAction<boolean>>;
    location: string;
    handleLocation: ({ target }: any) => void;
}

export default function Modal({stays, typing, setTyping, location, handleLocation}: Props): ReactElement {
    const locationRef = useRef<HTMLInputElement>(null);

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
            transition={{duration: 0.3}}
            onMouseOver={() => setTyping(false)}
            onClick={() => setTyping(false)} className="modalWrapper">
                <motion.div onMouseOver={(e:any) => e.stopPropagation()} onClick={(e:any) => e.stopPropagation()} className="modal">
                <div className="filter-wrapper">
                    <div className="filter-lg">
                        <span className="borders"><label>Location</label><input placeholder="Add location" ref={locationRef} value={location} onChange={handleLocation} type="text" /></span>
                        <span className="borders"><label>Guests</label><input placeholder="Add guests" type="text" /></span>
                        <span className="search-btn-lg"><span className="lg"><AiOutlineSearch size={22} color="#FFFFFF" /> Search</span></span>
                    </div>
                    <div className="cityOptions">
                        {extractCities(stays).map(city => <div className="options" onClick={handleLocation}><MdLocationOn width={14} height={19.47} />{city}</div>)}
                    </div>
                </div>
                </motion.div>
            </motion.div>}
      </AnimatePresence>
    )
}
