const Filter = ({ handleChange }) => {

    const handleOnChange = (event)=>{
        console.log(event.target.value);
        handleChange(event.target.value)
    }

    return (<>
        find countries
        <input id = "countryName" onChange = {handleOnChange} />
    </>)
}

export default Filter;