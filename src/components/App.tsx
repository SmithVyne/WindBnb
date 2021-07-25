import { useCallback, useEffect, useState } from 'react';
import {debounce} from 'lodash';
import 'antd/dist/antd.css';
import './App.css';
import Nav from './Nav';
import Body from './Body';
import Modal from './Modal';
import { splitLocation } from './utils';

const filterStays = (n_stays: Stays[], location:string[]) => {
  if (location[0]) {
    const [cityName, countryName] = location;
    return n_stays.filter(({city, country}) => {
      city = city.toLowerCase()
      country = country.toLowerCase()
      return countryName ? (city === cityName && country === countryName) : city === cityName;
    })
  }

  return n_stays;
}

export interface Stays {
  "city": string;
  "country": string;
  "superHost": boolean;
  "title": string;
  "rating": number;
  "maxGuests": number;
  "type": string;
  "beds": number;
  "photo": string;
}

function App() {
  const [stays, setStays] = useState< [] | Stays[] >([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [deb_location, setDebLocation] = useState<string[]>([""]);
  const handleLocation = ({target}:any) => {
    if(target.textContent) {
      setLocation(target.textContent)
    } else {
      setLocation(target.value)
    }
  };

  const deb_funtion = useCallback(debounce(location => setDebLocation(splitLocation(location)), 500), []);
  useEffect(() => deb_funtion(location), [location, deb_funtion]);
  
  useEffect(() => {
    fetch('stays.json')
      .then(response => response.json())
      .then(n_stays => setStays(filterStays(n_stays, deb_location)))
  }, [deb_location])

  

  const props = {stays, location: deb_location}
  return (
    <>
      <Modal stays={stays} typing={typing} setTyping={setTyping} location={location} handleLocation={handleLocation} />
      <Nav setTyping={setTyping} location={location} handleLocation={handleLocation} />
      <Body {...props} />
    </>
  );
}

export default App;
