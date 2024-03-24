import LanguageList from "./LanguageList";
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h4>Languages:</h4>
      <LanguageList languages={country.languages} />
      <figure>
        <img className="flag-img" src={country.flags.svg} alt="flag" />
      </figure>
    </>
  );
};

export default Country;
