import axios from "axios";

const getWeatherInfo = async (country) => {
  if (country) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      country.capital[0]
    }&appid=${import.meta.env.VITE_APP_KEY}`;
    try {
      const promise = await axios.get(url);
      return promise.then((response) => {
        const { weather, main, wind } = response.data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        console.log(response.data);
        console.log(main);
        console.log(wind);

        return { main, wind, weather, iconUrl }
      })
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather data");
    }
  }
};

export default { getWeatherInfo };
