const Filter = ({ handleChange }) => {

    const handleOnChange = (event)=>{
        handleChange(event.target.value)
    }

    return (
    <div className = "filter">
        <label>Find countries</label>
        <input onChange = {handleOnChange} />
    </div>)
}

export default Filter;