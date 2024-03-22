const Filter = ({ handleChange }) => {

    const handleOnChange = (event)=>{
        handleChange(event.target.value)
    }

    return (<>
        find countries
        <input onChange = {handleOnChange} />
    </>)
}

export default Filter;