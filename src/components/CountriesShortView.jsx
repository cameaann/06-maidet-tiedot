import CountryItem from "./CountryItem";

const CountriesShortView = ({ countries, handleShow }) => {
  const handleOnShow = (country) => {
    handleShow(country);
  };
  return (
    <div className="wrap-countries">
      {countries.map((x) => {
        return (
          <CountryItem key={x.name.common} country={x} onClick={handleOnShow} />
        );
      })}
    </div>
  );
};

export default CountriesShortView;
