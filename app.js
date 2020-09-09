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
            let newDesc = document.createElement('div');
            let newTemp = document.createElement('div');
            newTime.classList.add('three-hour-time');
            newDesc.classList.add('three-hour-desc');
            newTemp.classList.add('three-hour-temp');
            newForecast.classList.add('three-hour');
            forecastWrapper.appendChild(newForecast);
            newForecast.appendChild(newTime);
            newForecast.appendChild(newDesc);
            newForecast.appendChild(newTemp);

            let time = lapse.dt;
            let timeConvert = new Date(time * 1000);
            let hours = timeConvert.getHours();
            let minutes = '0' + timeConvert.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);

            newTime.textContent = formattedTime;
            newDesc.textContent = lapse.weather[0].main;
            newTemp.textContent = Math.round(lapse.main.temp) + '°';
          });
        });

      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const name = data.name;
          const description = data.weather[0].description;
          const { temp, temp_max, temp_min, humidity, feels_like } = data.main;
          const { country } = data.sys;
          const wind = data.wind.speed;

          // set DOM Elements from the API

          tempDegree.textContent = Math.round(temp) + '°';
          tempDesc.textContent = description;
          locationName.textContent = name + ', ' + country;
          feelsLike.textContent = Math.round(feels_like) + '°';
          weatherHumidity.textContent = humidity + '%';
          weatherWind.textContent = Math.round(wind) + 'mph';
          weatherHigh.textContent = Math.round(temp_max) + '°';
          weatherLow.textContent = Math.round(temp_min) + '°';
          searchInput.value = name + ', ' + country;

          if (temp <= 49) {
            weatherApp.style.background = '#3d405b';
            tempDegree.style.color = '#FFFFFF';
            tempDesc.style.color = '#FFFFFF';
            locationName.style.color = '#FFFFFF';
            weatherH1.style.color = '#FFFFFF';

            detailH3.forEach((detail) => {
              detail.style.color = '#3d405b';
            });
          } else if (temp >= 50 && temp <= 60) {
            weatherApp.style.background = '#81b29a';
            tempDegree.style.color = '#FFFFFF';
            tempDesc.style.color = '#FFFFFF';
            locationName.style.color = '#FFFFFF';
            weatherH1.style.color = '#FFFFFF';

            detailH3.forEach((detail) => {
              detail.style.color = '#81b29a';
            });
          } else if (temp >= 60 && temp <= 74) {
            weatherApp.style.background = '#f2cc8f';
            tempDegree.style.color = '#FFFFFF';
            tempDesc.style.color = '#FFFFFF';
            locationName.style.color = '#FFFFFF';
            weatherH1.style.color = '#FFFFFF';

            detailH3.forEach((detail) => {
              detail.style.color = '#f2cc8f';
            });
          } else if (temp >= 75) {
            weatherApp.style.background = '#e07a5f';
            tempDegree.style.color = '#FFFFFF';
            tempDesc.style.color = '#FFFFFF';
            locationName.style.color = '#FFFFFF';
            weatherH1.style.color = '#FFFFFF';

            detailH3.forEach((detail) => {
              detail.style.color = '#e07a5f';
            });
          }
        });

      searchInput.addEventListener('keyup', function (event) {
        let inputValue = searchInput.value;

        let eachValue = inputValue.split(', ');

        //samples.openweathermap.org/data/2.5/weather?q=portland,or&appid=439d4b804bc8187953eb36d2a8c26a02
        //api.openweathermap.org/data/2.5/weather?q=portland,or&appid=cd3c9e871a3df32134b43dc0c7a65547&units=imperial

        const apiCity = `http://api.openweathermap.org/data/2.5/weather?q=${eachValue[0]},${eachValue[1]},${eachValue[2]}&appid=${apiKey}&units=imperial`;
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
                let newDesc = document.createElement('div');
                let newTemp = document.createElement('div');
                newTime.classList.add('three-hour-time');
                newDesc.classList.add('three-hour-desc');
                newTemp.classList.add('three-hour-temp');
                newForecast.classList.add('three-hour');
                forecastWrapper.appendChild(newForecast);
                newForecast.appendChild(newTime);
                newForecast.appendChild(newDesc);
                newForecast.appendChild(newTemp);

                // let newTime = document.querySelector('.three-hour-time');
                // let newDesc = document.querySelector('.three-hour-desc');
                // let newTemp = document.querySelector('.three-hour-temp');

                let time = lapse.dt;
                let timeConvert = new Date(time * 1000);
                let hours = timeConvert.getHours();
                let minutes = '0' + timeConvert.getMinutes();
                let formattedTime = hours + ':' + minutes.substr(-2);

                newTime.textContent = formattedTime;
                newDesc.textContent = lapse.weather[0].main;
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

              if (temp <= 49) {
                weatherApp.style.background = '#3d405b';
                tempDegree.style.color = '#FFFFFF';
                tempDesc.style.color = '#FFFFFF';
                locationName.style.color = '#FFFFFF';
                weatherH1.style.color = '#FFFFFF';

                detailH3.forEach((detail) => {
                  detail.style.color = '#3d405b';
                });
              } else if (temp >= 50 && temp <= 60) {
                weatherApp.style.background = '#81b29a';
                tempDegree.style.color = '#FFFFFF';
                tempDesc.style.color = '#FFFFFF';
                locationName.style.color = '#FFFFFF';
                weatherH1.style.color = '#FFFFFF';

                detailH3.forEach((detail) => {
                  detail.style.color = '#81b29a';
                });
              } else if (temp >= 60 && temp <= 74) {
                weatherApp.style.background = '#f2cc8f';
                tempDegree.style.color = '#FFFFFF';
                tempDesc.style.color = '#FFFFFF';
                locationName.style.color = '#FFFFFF';
                weatherH1.style.color = '#FFFFFF';

                detailH3.forEach((detail) => {
                  detail.style.color = '#f2cc8f';
                });
              } else if (temp >= 75) {
                weatherApp.style.background = '#e07a5f';
                tempDegree.style.color = '#FFFFFF';
                tempDesc.style.color = '#FFFFFF';
                locationName.style.color = '#FFFFFF';
                weatherH1.style.color = '#FFFFFF';

                detailH3.forEach((detail) => {
                  detail.style.color = '#e07a5f';
                });
              }
            });
        }
      });
    });
  }
});
