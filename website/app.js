/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API9
const apiKey = '997734ccea8e126f65dbe0c9012d5efc&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  getWeather();
}

/* Function to GET Web API Data */

// Chain async functions to POST weather data then GET the resulting data
const getWeather = async () => {
  postWeatherData().then(retrieveData);
};

// /* Function to POST data */
async function postWeatherData() {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;

  await fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ weatherUrl: baseURL, feelings })
  });
}

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
  const res = await fetch('/all');
  try {
    // transform into JSON
    const allData = await res.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
};
