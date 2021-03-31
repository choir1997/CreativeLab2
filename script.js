document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  var value = document.getElementById("weatherInput").value;
  value = value.charAt(0).toUpperCase() + value.slice(1);
  if (value === "")
    return;
  console.log(value);
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const url = "https://covid-api.mmediagroup.fr/v1/cases?country=" + value;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";

        results += '<h2>Covid Data in ' + formatNumber(json.All.country) + "</h2>";
        results += "<p>Confirmed cases: " + formatNumber(json.All.confirmed) + "</p>";
        results += "<p>Total deaths: " + formatNumber(json.All.deaths) + "</p>";
        results += "<p>Recovered: " + formatNumber(json.All.recovered) + "</p>";
        results += "</p>";
    document.getElementById("weatherResults").innerHTML = results;
      });

  const url2 = "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + value;
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "";
        forecast += '<h3>Vaccine info</h3>';
        forecast += '<p>Vaccines administered: ' + formatNumber(json.All.administered) + '</p>';
        forecast += '<p>People vaccinated: ' + formatNumber(json.All.people_vaccinated) + '</p>';
        forecast += '<p>People partially vaccinated: ' + formatNumber(json.All.people_partially_vaccinated) + '</p>';
        console.log(json);
      document.getElementById("forecastResults").innerHTML = forecast;
      });

      const url3 = "https://covid-api.mmediagroup.fr/v1/history?country=" + value + "&status=deaths";
        fetch(url3)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            let history= "";
            history += '<h3>Deaths by Date:</h3>';
            history += "<ul>";
            for (const [key, value] of Object.entries(json.All.dates)) {
              history += "<li>" + key + ": " + formatNumber(value) + "</li>";
            }
            history += "</ul>";
            console.log(json);
          document.getElementById("history").innerHTML = history;
          });

});
