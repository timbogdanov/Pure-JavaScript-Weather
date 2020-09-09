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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = 'cd3c9e871a3df32134b43dc0c7a65547';
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const name = data.name;
          const description = data.weather[0].description;
          const { temp, humidity, feels_like } = data.main;
          const { country } = data.sys;
          const wind = data.wind.speed;

          // set DOM Elements from the API

          tempDegree.textContent = Math.round(temp) + '°';
          tempDesc.textContent = description;
          locationName.textContent = name + ', ' + country;
          feelsLike.textContent = Math.round(feels_like) + '°';
          weatherHumidity.textContent = humidity + '%';
          weatherWind.textContent = Math.round(wind) + 'mph';
          searchInput.value = name;

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
        const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;
        if (event.keyCode === 13) {
          fetch(apiCity)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const name = data.name;
              const description = data.weather[0].description;
              const { temp, humidity, feels_like } = data.main;
              const { country } = data.sys;
              const wind = data.wind.speed;

              tempDegree.textContent = Math.round(temp) + '°';
              tempDesc.textContent = description;
              locationName.textContent = name + ', ' + country;
              feelsLike.textContent = Math.round(feels_like) + '°';
              weatherHumidity.textContent = humidity + '%';
              weatherWind.textContent = Math.round(wind) + 'mph';
              searchInput.value = name;

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
