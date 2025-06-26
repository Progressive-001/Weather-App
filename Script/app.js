
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details =  document.querySelector('.details');
const time =  document.querySelector('.time');
const icon =  document.querySelector('.icon img');



const updateUI = (data) => {

  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  //Destructing properties (Much more concise)
  const {cityDetails, weather} = data;

  // Update details template
  details.innerHTML =`
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update the night / day & icon images
  const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc);

  // let timeSrc = null;

  // if (weather.IsDayTime){
  //   timeSrc = './img/day.svg';
  // }else{
  //   timeSrc = './img/night.svg';
  // }

  // Ternary Operator (Much more concise)
  let timeSrc = weather.IsDayTime ?  './img/day.svg' : './img/night.svg';
  time.setAttribute('src', timeSrc);


  // Remove the d-none class id present
  if (card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

};



const updateCity = async (city) =>{

  const cityDetails = await getCity(city);

  const weather = await getWeather(cityDetails.Key);

  return{
    cityDetails: cityDetails,
    weather: weather
  };

};

cityForm.addEventListener('submit', (e) => {
  // Prevent default action
 e.preventDefault();

 // Get city value
 const city = cityForm.city.value.trim()
 cityForm.reset();

 // Update the ui with new city
 updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});