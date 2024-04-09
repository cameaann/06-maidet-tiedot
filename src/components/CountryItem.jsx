// import Country from "./Country";

const CountryItem = ({country, onClick }) => {

  const show = () => {
    console.log(country.name.common);
    onClick(country)
    // return <Country country={country} />
  };
  
  return (
    <div className="country-item">
      <span>{country.name.common}</span>
      <button className="show-button" onClick={show}>show</button>
    </div>
  );
};

export default CountryItem;
