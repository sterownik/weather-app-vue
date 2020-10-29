export async function getWeather(city) {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=29a4e59f8b934372bf883d2a4e6c18a2&units=metric"
  );
  const cities = await response.json();
  return cities;
}
