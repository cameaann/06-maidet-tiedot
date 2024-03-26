import axios from "axios"
// const url = "https://api.openweathermap.org/data/2.5/weather?q="
// {city name},{state code},{country code}&appid={API key}"

const url = "http://localhost:3001/weatherInfo"

const getWeatherInfo = (capital) => {
    // console.log(capital)
    const promise = axios.get(url)
    return promise.then(response => 
        {
            const { weather, main, wind } = response.data[0]
            const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
            console.log(main)
            console.log(wind);

        
            return {main, wind, weather, iconUrl}
        }) 
}

export default { getWeatherInfo }
