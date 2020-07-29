function getWeather() {
  let city = document.querySelector("select").value;

  getWeatherFromApi(city).then(function (weatherData) {
    let innerMarkup;
    if (document.getElementById("celsiusRadio").checked) {
      innerMarkup = weatherData.current.feelslike_c;
    } else if (document.getElementById("fahrenheitRadio").checked) {
      innerMarkup = weatherData.current.feelslike_f;
    }
    let markup = `<section> 
    <p>${weatherData.location.name}</p
    <p>Local date and time: ${weatherData.location.localtime}</p>
    <p> The temperature is: 
    ${innerMarkup}</p>
    <p>It is :
    ${weatherData.current.condition.text}</p>
    <img class="position-image" src=https:${weatherData.current.condition.icon} alt = Cloud icon/>
    </section>`

    let asideElement = document.querySelector("aside");
    asideElement.innerHTML = markup;
    choosePreferance()
  });
}

function choosePreferance() {
  let radioButtonLS = document.getElementById("local-storage-data");
  let radioButtonCookie = document.getElementById("cookie-data");
  if (radioButtonLS.checked) {
    setDataStorage()
  } else if (radioButtonCookie.checked == true) {
    setCookie();
  }
}


function setDataStorage() {
  let radioButtons = document.getElementsByName("radio");
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      let radioButtonValue = radioButton.value;
      localStorage.setItem("preferance", radioButtonValue);
    }
  });
  clearStoredData(false, true);
}

window.onload = function () {
  let localStorageData = localStorage.getItem("preferance");
  let dataCookie = getCookie("preferance");
  if (localStorageData || dataCookie) {
    document.querySelector(".settings").style.display = "none";
    document.querySelector(".clear-button").style.display = "block";
  }


  if (localStorageData) {
    let radioButtons = document.getElementsByName("radio");
    radioButtons.forEach(radioButton => {
      if (radioButton.value == localStorageData) {
        radioButton.checked = true;
      }
    });
  } else if (dataCookie) {
    let radioButtons = document.getElementsByName("radio");
    radioButtons.forEach(radioButton => {
      if (radioButton.value == dataCookie) {
        radioButton.checked = true;
      }
    });
  }
}

function setCookie() {
  let radioButtons = document.getElementsByName("radio");
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      let radioButtonValue = radioButton.value;
      let date = new Date();
      date.setMonth(date.getMonth() + 1);
      document.cookie = "preferance =" + radioButtonValue + ";path=/;expires=" + date.toUTCString();
    }
  });
  clearStoredData(true, false);
}

function getCookie(preferance) {
  let preferanceValue = preferance + "=";
  let cookieArray = document.cookie.split(';');
  cookieArray.forEach(cookie => {
    while (cookie.charAt(0) == ' ')
      cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(preferanceValue) == 0)
      return cookie.substring(preferanceValue.length, cookie.length);
  });
  return null;
};


function clearPreferance() {
  document.querySelector(".settings").style.display = "block";
  document.querySelector(".clear-button").style.display = "none";
  clearStoredData(true, true);
}

function clearStoredData(isLocalStorage, isCookie) {
  if (isLocalStorage) {
    localStorage.clear();
  }
  if (isCookie) {
    document.cookie = "preferance= ;path=/; expires = Thu, 01 Jan 1970 00:00:00 "
  }
}