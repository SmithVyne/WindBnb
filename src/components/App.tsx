import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Nav from './Nav';
import Body from './Body';

const filterStays = (stays: Stays[], location:string[]) => {
  const [cityName, countryName] = location;
  return stays.filter(({city, country}) => {
    city = city.toLowerCase()
    country = country.toLowerCase()
    return countryName ? (city === cityName && country === countryName) : city === cityName;
  })
}

interface Stays {
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
  const [location, setLocation] = useState<string[]>([""]);

  useEffect(() => {
    fetch('stays.json')
      .then(response => response.json())
      .then(n_stays => setStays( stays[0] || location[0] ? filterStays(n_stays, location) : n_stays))
  }, [location])

  const props = {stays, location}
  console.log(stays)
  return (
    <>
      <Nav setLocation={setLocation} />
      <Body {...props} />
    </>
  );
}

export default App;
