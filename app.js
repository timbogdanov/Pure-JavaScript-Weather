window.addEventListener('load', () => {
  let long;
  let lat;

  let locationName = document.querySelector('.location-name');
  let tempDesc = document.querySelector('.temp-desc');
  let tempDegree = document.querySelector('.temp-in-f');
  let weatherApp = document.querySelector('.weather-app');
  let feelsLike = document.querySelector('.feels-like');
  let weatherHumidity = document.querySelector('.humidity');
  let weatherWind = document.querySelector('.wind');
  let searchInput = document.querySelector('.search-input');
  let weatherH1 = document.querySelector('.weather h1');
  let detailH3 = document.querySelectorAll('.detail  h3');
  let weatherHigh = document.querySelector('.high');
  let weatherLow = document.querySelector('.low');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = 'cd3c9e871a3df32134b43dc0c7a65547';

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

      const fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

      let forecastWrapper = document.querySelector('.five-day-forecast');

      fetch(fiveDayApi)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.list.forEach((lapse) => {
            let newForecast = document.createElement('div');
            let newTime = document.createElement('div');
            let newTemp = document.createElement('div');
            let weatherIcon = document.createElement('img');

            newForecast.classList.add('three-hour');
            newTime.classList.add('three-hour-time');
            newTemp.classList.add('three-hour-temp');
            weatherIcon.classList.add('three-hour-icon');

            forecastWrapper.appendChild(newForecast);
            newForecast.appendChild(newTime);
            newForecast.appendChild(newTemp);
            newForecast.appendChild(weatherIcon);

            weatherIcon.src = `http://openweathermap.org/img/wn/${lapse.weather[0].icon}@2x.png`;

            let time = lapse.dt;
            let timeConvert = new Date(time * 1000);
            let hours = timeConvert.getHours() % 12;
            let minutes = '0' + timeConvert.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);

            newTime.textContent = formattedTime;
            newTemp.textContent = Math.round(lapse.main.temp) + '°';
          });
        })
        .catch((error) => {
          console.log(error.message);
        });

      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const name = data.name;
          const description = data.weather[0].description;
          const { temp, temp_max, temp_min, humidity, feels_like } = data.main;
          const { country } = data.sys;
          const wind = data.wind.speed;

          const currentTemp = document.querySelector('.current-temp');
          let mainWeatherIcon = document.createElement('img');
          mainWeatherIcon.classList.add('main-hour-icon');
          currentTemp.prepend(mainWeatherIcon);
          mainWeatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

          // set DOM Elements from the API

          tempDegree.textContent = Math.round(temp);
          tempDesc.textContent = description;
          locationName.textContent = name + ', ' + country;
          feelsLike.textContent = Math.round(feels_like) + '°';
          weatherHumidity.textContent = humidity + '%';
          weatherWind.textContent = Math.round(wind) + 'mph';
          weatherHigh.textContent = Math.round(temp_max) + '°';
          weatherLow.textContent = Math.round(temp_min) + '°';
          searchInput.value = name + ', ' + country;
        });

      searchInput.addEventListener('keyup', function (event) {
        let inputValue = searchInput.value;

        let eachValue = inputValue.split(', ');

        //samples.openweathermap.org/data/2.5/weather?q=portland,or&appid=439d4b804bc8187953eb36d2a8c26a02
        //api.openweathermap.org/data/2.5/weather?q=portland,or&appid=cd3c9e871a3df32134b43dc0c7a65547&units=imperial

        const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${eachValue[0]},${eachValue[1]},${eachValue[2]}&appid=${apiKey}&units=imperial`;
        if (event.keyCode === 13) {
          const fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?q=${eachValue[0]},${eachValue[1]},${eachValue[2]}&appid=${apiKey}&units=imperial`;

          fetch(fiveDayApi)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              data.list.forEach((lapse) => {
                let oldForecast = document.querySelector('.three-hour');
                oldForecast.remove();
                let newForecast = document.createElement('div');
                let newTime = document.createElement('div');
                let newTemp = document.createElement('div');
                let weatherIcon = document.createElement('img');

                weatherIcon.classList.add('three-hour-icon');
                newTime.classList.add('three-hour-time');
                newTemp.classList.add('three-hour-temp');
                newForecast.classList.add('three-hour');
                forecastWrapper.appendChild(newForecast);
                newForecast.appendChild(newTime);
                newForecast.appendChild(newTemp);
                newForecast.appendChild(weatherIcon);
                weatherIcon.src = `http://openweathermap.org/img/wn/${lapse.weather[0].icon}@2x.png`;

                // let newTime = document.querySelector('.three-hour-time');
                // let newDesc = document.querySelector('.three-hour-desc');
                // let newTemp = document.querySelector('.three-hour-temp');

                let time = lapse.dt;
                let timeConvert = new Date(time * 1000);
                let hours = timeConvert.getHours() % 12;
                let minutes = '0' + timeConvert.getMinutes();
                let formattedTime = hours + ':' + minutes.substr(-2);

                newTime.textContent = formattedTime;
                newTemp.textContent = Math.round(lapse.main.temp) + '°';
              });
            });

          fetch(apiCity)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const name = data.name;
              const description = data.weather[0].description;
              const {
                temp,
                temp_max,
                temp_min,
                humidity,
                feels_like,
              } = data.main;
              const { country } = data.sys;
              const wind = data.wind.speed;

              tempDegree.textContent = Math.round(temp) + '°';
              tempDesc.textContent = description;
              locationName.textContent = name + ', ' + country;
              feelsLike.textContent = Math.round(feels_like) + '°';
              weatherHumidity.textContent = humidity + '%';
              weatherWind.textContent = Math.round(wind) + 'mph';
              weatherHigh.textContent = Math.round(temp_max) + '°';
              weatherLow.textContent = Math.round(temp_min) + '°';
              searchInput.value = name + ', ' + country;
            });
        }
      });
    });
  }
});
