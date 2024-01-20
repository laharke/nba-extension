
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=";
document.addEventListener('DOMContentLoaded', function () {
      
    
      // Make a simple GET request to a sample API
    loadGames();
});


//Cargo todos los games
function loadGames(){
  fetch(apiUrl+getDate())
    .then(response => response.json())
    .then(data => {
      console.log('Fetch successful:', data);
      for (const partido of data.data) {
        generarPartido(partido);
      }
      
      // You can do more with the fetched data here
    })
    .catch(error => console.error('Fetch error:', error));
}

function generarPartido(partido) {

  let body = document.getElementById('main-container');
  body.appendChild(generarPartidoPrueba(partido));
  //Separator entre partidos?
  let hrDivisor = document.createElement('hr');
  body.appendChild(hrDivisor);
}

//Genero el template cada partido
function generarPartidoPrueba(partido) {
  const homeTeamName = partido.home_team.full_name;
  const visitorTeamName = partido.visitor_team.full_name;
  const template = document.createElement('div'); // Este es mi div padre 
  template.className = 'match-score-container';
  const contenidoPartido = `
      <div class="team">
        <img src="../images/${homeTeamName.replace(/ /g, "")}.png" class="team-logo">
        <span class="team-name">${homeTeamName}</span>
        <span class="team-score">${partido.home_team_score}</span>
      </div>
      <div class="separator">-</div>
      <div class="team">
        <span class="team-score">${partido.visitor_team_score}</span>
        <span class="team-name">${visitorTeamName}</span>
        <img src="../images/${visitorTeamName.replace(/ /g, "")}.png" alt="Team 2 Logo" class="team-logo">
      </div>
  `;
  template.innerHTML = contenidoPartido; // A mi template le agrego el contenido del partido
  return template
}
function getDate(){
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  //Titulo lo pogno ACA por ahora dsp lo acomodamos para ver cuando se llama, tiene sentido aca pero re mala pracitca dale let.
  //Aparte vamos a tener que ponerle un DATA attribute a los botones de ayer hoy y mañana para pegarle a la api, va no, por ahi con new date agarramos el dia de ayer?
  let currentDate = new Date() 
  // Instantiate another object (based on the current), so we won't mutate the currentDate object
  let yesterday = new Date(currentDate)
  yesterday.setDate(yesterday.getDate() - 1)

  //Tomorrow date
  let tomorrow = new Date(currentDate)
  tomorrow.setDate(tomorrow.getDate() + 1)


  yesterday = formatDate(yesterday)
  tomorrow = formatDate(tomorrow)

  document.querySelector('#yesterday').innerHTML = yesterday;
  document.querySelector('#today').innerHTML = `${year}-${month}-${day}`;
  document.querySelector('#tomorrow').innerHTML = tomorrow;

  return `${year}-${month}-${day}`;
}

function formatDate(date){
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
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
