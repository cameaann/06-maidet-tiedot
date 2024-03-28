import axios from "axios";

const getWeatherInfo = (country) => {
  if (country) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      country.capital[0]
    }&appid=${import.meta.env.VITE_APP_KEY}`;

    const promise = axios.get(url);
    return promise.then((response) => {
      const { weather, main, wind } = response.data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      console.log(response.data);
      console.log(main);
      console.log(wind);

      return { main, wind, weather, iconUrl };
    });
  }

};

export default { getWeatherInfo };
