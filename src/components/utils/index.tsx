import { Stays } from "../App";

export const splitLocation = (location: string) => location.toLowerCase().split(',').map(str => str.trim());
export const extractCities = (stays : [] | Stays[]) => [...(new Set(stays.map(({city, country}) => `${city}, ${country}`)))];