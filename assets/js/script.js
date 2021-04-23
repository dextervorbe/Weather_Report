// make a form with input
// when user enters city, present with current&future weather conditions and add it to history list
// current weather conditions include name, date, icon, tmep, humd, wind speed, and uv index
// UV index indicates whether the conditions are favorable, moderate, or severe
// future weather conditions include date, icon, temp, humd, and wind speed
// when user clicks on hitory, present condition for that item


var fetchButton = document.querySelector("#searchBtn");
var userInput = document.querySelector("#userInput");
var cityList = document.querySelector('#cityList');
var cityHeader = document.querySelector('#cityName');
var temp = document.querySelector("#temp");
var hum = document.querySelector("#humidity");
var windspeed = document.querySelector("#windspeed");
var uv = document.querySelector("#UV");
//card data values
var date = document.querySelector('#date');
var cardDate1 = document.querySelector('#cardDate1');
var cardDate2 = document.querySelector('#cardDate2');
var cardDate3 = document.querySelector('#cardDate3');
var cardDate4 = document.querySelector('#cardDate4');
var cardDate5 = document.querySelector('#cardDate5');
//card temp values
var cardTemp1 = document.querySelector('#cardTemp1');
var cardTemp2 = document.querySelector('#cardTemp2');
var cardTemp3 = document.querySelector('#cardTemp3');
var cardTemp4 = document.querySelector('#cardTemp4');
var cardTemp5 = document.querySelector('#cardTemp5');
//card Humidity values
var cardHum1 = document.querySelector('#cardHum1');
var cardHum2 = document.querySelector('#cardHum2');
var cardHum3 = document.querySelector('#cardHum3');
var cardHum4 = document.querySelector('#cardHum4');
var cardHum5 = document.querySelector('#cardHum5');
//card icons
var currentIcon = document.querySelector('.weather-icon');
var firstIcon = document.querySelector('#firstIcon');
var secondIcon = document.querySelector('#secondIcon');
var thirdIcon = document.querySelector('#thirdIcon');
var fourthIcon = document.querySelector('#fourthIcon');
var fifthIcon = document.querySelector('#fifthIcon');
//api key
var APIkey = '&appid=8bf8eabf7492de904834ed8ef764f0d3';
var searchCities = [];
var localStorageCities = JSON.parse(localStorage.getItem('searchCities'));

if (localStorageCities) {
    searchCities = localStorageCities;
}

function updateSidebar() {
    cityList.innerHTML = "";
    for (let i = 0; i < searchCities.length; i++) {
        const city = searchCities[i];
        var newCity = document.createElement('li');
        newCity.onclick = function () { fetchApi(city) }


        newCity.textContent = city;

        newCity.classList.add("list-group-item");
        cityList.appendChild(newCity);

    }
}

updateSidebar()

function fetchApi(cityName) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + APIkey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)



            currentIcon.innerHTML = `<img src="icons/${data.weather[0].icon}.png">`;


            date.textContent = moment().format('MMMM Do YYYY');
            cityHeader.textContent = data.name;
            temp.textContent = "Tempurature: " + data.main.temp + ' F';
            hum.textContent = "Humidity: " + data.main.humidity + '%';
            windspeed.textContent = "Wind Speed: " + data.wind.speed + ' mph';
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            localStorage.setItem('longitude', longitude);
            localStorage.setItem('latitude', latitude);
        })
        .then(() => {
            fetchApi1()
        })





}

function fetchApi1() {
    var latitude = localStorage.getItem('latitude')
    var longitude = localStorage.getItem('longitude')
    var requestUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + '&units=imperial' + APIkey

    fetch(requestUrl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)


            uv.textContent = 'UV Index: ' + data.current.uvi;
            cardTemp1.textContent = 'Tempurature: ' + data.daily[0].temp.max + ' F';
            cardTemp2.textContent = 'Tempurature: ' + data.daily[1].temp.max + ' F';
            cardTemp3.textContent = 'Tempurature: ' + data.daily[2].temp.max + ' F';
            cardTemp4.textContent = 'Tempurature: ' + data.daily[3].temp.max + ' F';
            cardTemp5.textContent = 'Tempurature: ' + data.daily[4].temp.max + ' F';

            cardHum1.textContent = 'Humidity: ' + data.daily[0].humidity + '%';
            cardHum2.textContent = 'Humidity: ' + data.daily[1].humidity + '%';
            cardHum3.textContent = 'Humidity: ' + data.daily[2].humidity + '%';
            cardHum4.textContent = 'Humidity: ' + data.daily[3].humidity + '%';
            cardHum5.textContent = 'Humidity: ' + data.daily[4].humidity + '%';

            firstIcon.innerHTML = `<img src="icons/${data.daily[0].weather[0].icon}.png">`;
            secondIcon.innerHTML = `<img src="icons/${data.daily[1].weather[0].icon}.png">`;
            thirdIcon.innerHTML = `<img src="icons/${data.daily[2].weather[0].icon}.png">`;
            fourthIcon.innerHTML = `<img src="icons/${data.daily[3].weather[0].icon}.png">`;
            fifthIcon.innerHTML = `<img src="icons/${data.daily[4].weather[0].icon}.png">`;

            cardDate1.textContent = moment().add(1, 'days').format('MMMM Do YYYY');
            cardDate2.textContent = moment().add(2, 'days').format('MMMM Do YYYY');
            cardDate3.textContent = moment().add(3, 'days').format('MMMM Do YYYY');
            cardDate4.textContent = moment().add(4, 'days').format('MMMM Do YYYY');
            cardDate5.textContent = moment().add(5, 'days').format('MMMM Do YYYY');


        })
}


fetchButton.addEventListener('click', function (event) {
    event.preventDefault();
    searchCities.push(userInput.value)
    localStorage.setItem('searchCities', JSON.stringify(searchCities));

    updateSidebar()
    fetchApi(userInput.value)

});

// cityBox.addEventListener('click',function(event) {  
//     event.preventDefault();


// });

