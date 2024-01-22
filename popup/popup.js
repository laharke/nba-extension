//Api Url
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=";


//Funcion ON LOAD
document.addEventListener('DOMContentLoaded', function () {
      
    //Obtenemos dia de hoy
    let date = getDate()
    //Llamamos a loadGames, funcion main()
    loadGames(date);
});

//Loopear todos los botones.
const buttons = document.querySelectorAll('.botonFecha').forEach(element => {
  element.addEventListener('click', () => {
      //Vaciamos container de los partidos
      document.getElementById('main-container').innerHTML = ''
      //Mostramos la pelota de basket (spinner)
      document.querySelector('.basketball').style.display = 'block';
      loadGames(element.dataset.fecha)
  })
})



//Funcion que carga los partidos, recibe como parametro una fecha
function loadGames(date){
  fetch(apiUrl+date)
    .then(response => response.json())
    .then(data => {
      //Borramos la pelota de basket (spinner)
      document.querySelector('.basketball').style.display = 'none';
      //Vamos creando cada template de cada partido
      for (const partido of data.data) {
        generarPartido(partido);
      }
      
    })
    .catch(error => console.error('Fetch error:', error));
}

//Funcion que genera el partido y su divisor y lo appendea al div de partidos.
function generarPartido(partido) {

  //Cada partido lo appendeamos a main-container
  let body = document.getElementById('main-container');
  body.appendChild(generarTemplatePartido(partido));
  //Separator entre entre los partidos
  let hrDivisor = document.createElement('hr');
  body.appendChild(hrDivisor);
}

//Genero el template cada partido.
//Retorna el div con todo el contenido del game
//Devuelve un DIV HTML con el Home - vs - Away.
function generarTemplatePartido(partido) {
  const homeTeamName = partido.home_team.full_name;
  const visitorTeamName = partido.visitor_team.full_name;
  const template = document.createElement('div');
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

  let currentDate = new Date();
  let today;
  //Get dia ayer formateado
  let yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  //Get dia mañana formateado
  let tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);

  
  today = formatDate(currentDate);
  yesterday = formatDate(yesterday);
  tomorrow = formatDate(tomorrow);

 
  //Set los data attributes con la Fecha correspondiente
  document.querySelector('#yesterday').setAttribute('data-fecha', yesterday);
  document.querySelector('#today').setAttribute('data-fecha', today);
  document.querySelector('#tomorrow').setAttribute('data-fecha', tomorrow);

  return today;
}

function formatDate(date){
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
