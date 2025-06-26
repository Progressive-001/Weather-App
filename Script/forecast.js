const key = '4ac5aebc88c44d40bc1160609252606';


// Get city information
const getCity = async (city) =>{

  const base = 'http://api.weatherapi.com/v1/current.json';

  const query = `?key=${key}&q=${city}&aqi=no`;

  const response = await fetch(base + query);

  const data = await response.json()

  return data;

};