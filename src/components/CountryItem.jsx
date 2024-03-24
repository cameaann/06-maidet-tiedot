import Country from "./Country";

const CountryItem = ({country, handleShow }) => {

  const show = () => {
    console.log(country.name.common);
    handleShow(country)
    return <Country country={country} />
  };
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={show}>show</button>
    </div>
  );
};

export default CountryItem;
