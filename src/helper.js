//****************************************************************************************************
// JSON-server CRUD functionality

function getJSONByKey(dbKey) {

    return fetch(`http://localhost:6001/${dbKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getJSONById(dbKey, Id) {

    return fetch(`http://localhost:6001/${dbKey}/${Id}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getEmbeddedJSON(baseKey, embeddedKey) {

    return fetch(`http://localhost:6001/${baseKey}?_embed=${embeddedKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getEmbeddedJSONById(baseKey, baseId, embeddedKey) {

    return fetch(`http://localhost:6001/${baseKey}/${baseId}?_embed=${embeddedKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function postJSONToDb(dbKey, jsonObj) {

    return fetch(`http://localhost:6001/${dbKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObj)
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
}

function patchJSONToDb(dbKey, Id, jsonObj) {

    fetch(`http://localhost:6001/${dbKey}/${Id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObj)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => console.log("EDITED", data))
    .catch(e => console.error(e));
}

function deleteJSONFromDb(dbKey, Id) {

  fetch(`http://localhost:6001/${dbKey}/${Id}`, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => console.log("DELETED", data))
  .catch(e => console.error(e));
}

const apiKey = "REMOVED_API_KEY"

function getWeatherForecast(locationSearch) {
  const locSearchRev = locationSearch.replace(/ /g, "%20");
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?q=${locSearchRev}&apikey=${apiKey}`
  console.log(url)

  return fetch(url)
  .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error finding location code! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data=>getForecastByLocKey(data[0].Key))
}

function getForecastByLocKey(locationKey) {
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

  return fetch(url)
  .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error loading forecast! Status: ${res.status}`);
      }
      return res.json();
    })
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export {getJSONByKey, getJSONById, getEmbeddedJSON, getEmbeddedJSONById, postJSONToDb, patchJSONToDb, deleteJSONFromDb, getWeatherForecast, formatDate};