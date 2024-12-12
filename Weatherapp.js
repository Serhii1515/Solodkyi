const API_KEY = `c9867dd2964b08c7801340b480795e0b`;

const searchTemperature = () => {
  const city = document.getElementById("city-name").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTemperature(data));
};

const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};

const displayTemperature = (temperature) => {
  console.log(temperature);
  setInnerText("city", temperature.name);
  setInnerText("temp", temperature.main.temp);
  setInnerText("weather", temperature.weather[0].main);

  // weather icon settings
  const url = ` temperature weather .png`;
  const imgIcon = document.getElementById("image-icon");
  imgIcon.setAttribute("src", url);
};
