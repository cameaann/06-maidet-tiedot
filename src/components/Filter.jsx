const Filter = ({ handleChange }) => {

    const handleOnChange = (event)=>{
        event.preventDefault()
        handleChange(event)
    }

    return (<>
        find countries
        <input id = "countryName" onChange = {(event)=> handleOnChange(event)} />
    </>)
}

export default Filter;