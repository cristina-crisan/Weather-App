function getWeatherFromApi(city) {
  const baseUrl = `https://api.apixu.com/v1/current.json?key=5945f5e3ffc044faa2e180009192005&q=${city}`;
  return fetch(baseUrl)
    .then(function (response) {
      return response.json();
    })
}