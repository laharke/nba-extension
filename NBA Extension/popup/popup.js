
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=2024-17-01";
document.addEventListener('DOMContentLoaded', function () {
   
      // Make a simple GET request to a sample API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log('Fetch successful:', data);
  
          // You can do more with the fetched data here
        })
        .catch(error => console.error('Fetch error:', error));
});

// partidos = api call
//for each partidos...
// create div
//appendear la info dle aprtido
//appendar el DIV a popup.html main div 


//GET https://www.balldontlie.io/api/v1/games
//Query Parameters
//You can combine query parameters. For example: ?seasons[]=2018&team_ids[]=1 will return games for team_id 1 for the 2018-2019 season.

//https://www.balldontlie.io/api/v1/games?dates[]=2024-17-01
