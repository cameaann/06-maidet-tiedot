import CountryItem from "./CountryItem";

const CountriesShortView = ({ countries, handleShow }) => {
  const handleOnShow = (country) => {
    handleShow(country);
  };
  return (
    <>
      {countries.map((x) => {
        return (
          <CountryItem key={x.name.common} country={x} onClick={handleOnShow} />
        );
      })}
    </>
  );
};

export default CountriesShortView;
