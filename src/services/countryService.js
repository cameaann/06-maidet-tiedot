import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
// const url = "https://restcountries.com/v3.1/all";

const getCountries = () => {
  const promise = axios.get(url);
  return promise.then((res) => res.data);
};

export default { getCountries };
