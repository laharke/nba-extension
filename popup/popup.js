
//Api Url
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=";



//Funcion ON LOAD
document.addEventListener('DOMContentLoaded', function () {
      
    
    let date = getDate()
    //Llamamos a loadGames, funcion main()
    loadGames(date);
});

//Loopear todos los botones.
//Deberiamos hacer un for each a todos los botones pero ahora agarro uno para TEST
document.querySelector('#yesterday').addEventListener('click', (element) => {
  console.log(element)
  console.log(document.querySelector("#yesterday").dataset.fecha)
  ;
  //Borro partidos viejos
  
  loadGames(document.querySelector("#yesterday").dataset.fecha)
})

//Cargo todos los games
//A load games hay que darle un arubmento que es la DATE HAY QUE REFACTORIZAR ESTO
//Y la funcion que appendea vamos a tener que hacer que borre los partidos viejos. osea que antes de appendar limpie el HTML

function loadGames(date){
  fetch(apiUrl+date)
    .then(response => response.json())
    .then(data => {
      console.log('Fetch successful:', data);
      document.getElementById('main-container').innerHTML = ''
      for (const partido of data.data) {
        generarPartido(partido);
      }
      
      // You can do more with the fetched data here
    })
    .catch(error => console.error('Fetch error:', error));
}

function generarPartido(partido) {

  let body = document.getElementById('main-container');
  body.appendChild(generarTemplatePartido(partido));
  //Separator entre entre los partidos
  let hrDivisor = document.createElement('hr');
  body.appendChild(hrDivisor);
}

//Genero el template cada partido.
//Devuelve un string HTML con el Home - vs - Away.
function generarTemplatePartido(partido) {
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

  let currentDate = new Date();
  let today;
  let yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  //Tomorrow date
  let tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);


  today = formatDate(currentDate);
  yesterday = formatDate(yesterday);
  tomorrow = formatDate(tomorrow);

 
  //Hago lo mimso de arriba pero les agrego un DATa-set nuevo a lso elment
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
