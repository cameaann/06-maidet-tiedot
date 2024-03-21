import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = () => {
  const promise = axios.get(url);
  return promise.then((res) => res.data);
};

export default { getCountries };
