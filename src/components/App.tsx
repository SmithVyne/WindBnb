import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Nav from './Nav';
import Body from './Body';

const filterStays = (f_stays: [] | Stays[], n_stays: Stays[], location:string[]) => {
  if (f_stays[0] || location[0]) {
    const [cityName, countryName] = location;
    return n_stays.filter(({city, country}) => {
      city = city.toLowerCase()
      country = country.toLowerCase()
      return countryName ? (city === cityName && country === countryName) : city === cityName;
    })
  }

  return n_stays;
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
      .then(n_stays => setStays( f_stays => filterStays(f_stays, n_stays, location)))
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
