import React, { ReactElement } from 'react';
import {debounce} from 'lodash';
import logo from '../logo.svg';

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<string[]>>;
}

const splitLocation = (location: string) => location.toLowerCase().split(',').map(str => str.trim());
export default function Nav({setLocation}: Props): ReactElement {
    const handleLocation = debounce(({target}) => {setLocation(splitLocation(target.value))}, 500);

    return (
        <nav>
            <a href='/'><img className='siteLogo' src={logo} /></a>
            <input onChange={handleLocation} />
        </nav>
    )
}
