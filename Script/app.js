
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details =  document.querySelector('.details');
const time =  document.querySelector('.time');
const icon =  document.querySelector('.icon img');



const updateUI = (data) => {

  //Destructing properties (Much more concise)
  const current = data.current;

  // Update details template
  details.innerHTML =`
    <h5 class="my-3">${current.location.name}</h5>
    <div class="my-3">${current.current.condition.text}</div>
    <div class="display-4 my-4">
      <span>${current.current.temp_c}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update the night / day & icon images
  const iconSrc = `${current.current.condition.icon}`
  icon.setAttribute('src', iconSrc);


  // Ternary Operator (Much more concise)
  let timeSrc = current.current.is_day ?  './img/day.svg' : './img/night.svg';
  time.setAttribute('src', timeSrc);


  // Remove the d-none class id present
  if (card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};



const updateCity = async (city) =>{

  const current = await getCity(city);

  
  return{
    current: current
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

  // Set Local Storage
  localStorage.setItem('city', city);

});


if (localStorage.getItem('city')){
   updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))
}