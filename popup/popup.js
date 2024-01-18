
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=2024-01-18";
document.addEventListener('DOMContentLoaded', function () {
   
      // Make a simple GET request to a sample API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log('Fetch successful:', data);
          for (const partido of data.data) {
            generarPartido(partido);
          }
          
          // You can do more with the fetched data here
        })
        .catch(error => console.error('Fetch error:', error));
});

function generarPartido(partido) {
 
  var partidoContainer = document.createElement('div');
  partidoContainer.className = 'match-score-container';
  console.log(partido+"hola");

  var equipo1 = document.createElement('div');
  equipo1.className = 'team';

  var logoEquipo1 = document.createElement('img');
  logoEquipo1.src = `../images/${partido.home_team.full_name.replace(/ /g, "")}.png`;
  logoEquipo1.className = 'team-logo';

  var nombreEquipo1 = document.createElement('span');
  nombreEquipo1.className = 'team-name';
  nombreEquipo1.textContent = partido.home_team.full_name;

  var scoreEquipo1 = document.createElement('span');
  scoreEquipo1.className = 'team-score';
  scoreEquipo1.textContent = partido.home_team_score;


  equipo1.appendChild(logoEquipo1);
  equipo1.appendChild(nombreEquipo1);
  equipo1.appendChild(scoreEquipo1);

  var separator = document.createElement('div');
  separator.className = 'separator';
  separator.textContent = '-';

  var equipo2 = document.createElement('div');
  equipo2.className = 'team';

  var scoreEquipo2 = document.createElement('span');
  scoreEquipo2.className = 'team-score';
  scoreEquipo2.textContent = partido.visitor_team_score; 

  var nombreEquipo2 = document.createElement('span');
  nombreEquipo2.className = 'team-name';
  nombreEquipo2.textContent = partido.visitor_team.full_name; 

  var logoEquipo2 = document.createElement('img');
  logoEquipo2.src = `../images/${partido.visitor_team.full_name.replace(/ /g, "")}.png`;
  logoEquipo2.alt = 'Team 2 Logo';
  logoEquipo2.className = 'team-logo';

  equipo2.appendChild(scoreEquipo2);
  equipo2.appendChild(nombreEquipo2);
  equipo2.appendChild(logoEquipo2);


  partidoContainer.appendChild(equipo1);
  partidoContainer.appendChild(separator);
  partidoContainer.appendChild(equipo2);


  var body = document.getElementById('main-container');
  body.appendChild(partidoContainer);
}


// partidos = api call
//for each partidos...
// create div
//appendear la info dle aprtido
//appendar el DIV a popup.html main div 


//GET https://www.balldontlie.io/api/v1/games
//Query Parameters
//You can combine query parameters. For example: ?seasons[]=2018&team_ids[]=1 will return games for team_id 1 for the 2018-2019 season.

//https://www.balldontlie.io/api/v1/games?dates[]=2024-17-01
