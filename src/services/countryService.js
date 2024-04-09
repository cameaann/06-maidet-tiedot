import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = async () => {
  const res = await axios.get(url);
  return res.data;
};

export default { getCountries };
