//Api Url
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=";
const endpoint = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
const espnUrl = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates='


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
      loadGames(element.dataset.fecha);
      
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
      //Api call para conseguir el horario en ESPN.
      setHorarios(date.split('-').join(''));
      
    })
    .catch(error => console.error('Fetch error:', error));
}

//Funcion que carga los HORARIOS E LOS PARTIDOS, recibe un equipo
// Endpoint para obtener los horarios de los partidos de la NBA


// Hacer la solicitud a la API

function setHorarios(date){
  fetch(`${espnUrl}${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Acceder a la información de los partidos
    const partidos = data.events;
    partidos.forEach((partido) => {
      
      //SETEAMOS EL HORARIO CON LA API DE ESPN
      let homeTeam = partido.name.replace(/ at /g, ' @ ');
      
      homeTeam = homeTeam.split('@')[1].replace(/\s/g, '');
      let horario = partido.date.split('T')[1]

      if (document.querySelector(`#${homeTeam}`).innerHTML == ''){
        document.querySelector(`#${homeTeam}`).innerHTML = convertToArgentinaTime(horario) + 'hs.'
      }
    })

    // Procesar la información de los partidos según tus necesidades
  })
  .catch(error => console.error('Error al obtener los horarios de la NBA:', error));
  
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
  // Crear el contenedor principal con la clase match-score-container y align-items-center
  const template = document.createElement('div');
  template.className = 'match-score-container align-items-center';
  // Crear el contenido HTML del partido
  //let horaArgentina = new Date(partido.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Argentina/Buenos_Aires' }).replace(/^[0:]*/, '');
  

  

  const contenidoPartido = `
    <div class="team">
      <img src="../images/${homeTeamName.replace(/ /g, "")}.png" class="team-logo">
      <span class="team-name">${homeTeamName}</span>
      <span class="team-score">${partido.home_team_score}</span>
    </div>
    
    <div class="separator">
    <div class="hora" id="${homeTeamName.replace(/\s/g, '')}">${partido.time  === null ? '': partido.time}</div>
            <div class="" style=" 
            justify-items: center;
            flex-wrap: wrap;
            align-content: center;
            text-align: center;
        ">-</div>
    </div>
    <div class="team team-second">
      <span class="team-score">${partido.visitor_team_score}</span>
      <span class="team-name">${visitorTeamName}</span>
      <img src="../images/${visitorTeamName.replace(/ /g, "")}.png" alt="Team 2 Logo" class="team-logo">
    </div>
  `;

  // Agregar el contenido al contenedor principal
  template.innerHTML = contenidoPartido;

  // Devolver el contenedor principal
  return template;
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

function convertToArgentinaTime(utcTimeString) {
  // Extract hours and minutes from the UTC time string
  const [hours, minutes] = utcTimeString.match(/\d+/g).map(Number);

  // Create a Date object with the UTC time
  const utcTime = new Date();
  utcTime.setUTCHours(hours, minutes, 0, 0);

  // Create a new Intl.DateTimeFormat object for Argentina time
  const argentinaTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  // Format the time using the Argentina time zone
  const formattedTime = argentinaTime.format(utcTime);

  return formattedTime;
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




/*
  TESTEO DE GET STANDINGSSSSSSSSSSSS
  TESTEO DE GET STANDINGSSSSSSSSSSSS
  TESTEO DE GET STANDINGSSSSSSSSSSSS
*/
const test = 'https://cdn.espn.com/core/nba/standings?xhr=1';

//Si haces click en STANDINGS quiero que Con JS standings se borre y AYER HOY MAñana TMB, Y solo queden dos botones de EAST - WEST.
//EL BOTON STANDINGS PASARIA A SER PARTIDOS  y lo tocas te carga el default, me seguis???
//De momento voy a ocultar los botones y mostrar los que quiero

//SI SE HACE CLICK EL OTRO BOTON DEBERIA SER ALREVES
//TAL VEZ HAYA QUE RESETEAR EL INNER.HTML = '' EN ALGUN CASO TESTEA
document.getElementById("standingsBoton").addEventListener('click', () => {
  document.querySelector("#partidosBotones").style.display = 'none';
  document.querySelector("#main-container").style.display = 'none';
  document.querySelector("#standingsBoton").style.display = 'none';
  document.querySelector('.basketball').style.display = 'block';
  document.getElementById('bodyTabla').innerHTML = '';
  
  document.querySelector("#partidosBoton").style.display = 'block';
  document.querySelector("#conferenciaBotones").style.display = 'block';
  document.querySelector("#standingsDiv").style.display = 'block';
  

})
document.getElementById("partidosBoton").addEventListener('click', () => {
  document.querySelector("#partidosBotones").style.display = 'block';
  document.querySelector("#main-container").style.display = 'block';
  document.querySelector("#standingsBoton").style.display = 'block';
  
  document.querySelector("#partidosBoton").style.display = 'none';
  document.querySelector("#conferenciaBotones").style.display = 'none';
  document.querySelector("#standingsDiv").style.display = 'none';

})

//Asignarle por JS la info.
document.getElementById("standingsBoton").addEventListener('click', () => {
  
  getStandings('west');
})


//ASIGNAR ON CLICKS PORQUE NOSE PUEDE EN EL HTML
document.getElementById('west').addEventListener('click', () => {
  document.querySelector('.basketball').style.display = 'block';
  document.getElementById('bodyTabla').innerHTML = '';
  getStandings('west');
})

document.getElementById('east').addEventListener('click', () => {
  document.querySelector('.basketball').style.display = 'block';
  document.getElementById('bodyTabla').innerHTML = '';
  getStandings('east');
})


//Get standings va a traer toda la info pero que reciba un parametro EXTRA para devolver east o west
function getStandings(conference = 'west') {
  fetch(test)
      .then(response => response.json())
      .then(data => {
        //Conference 
        let west = data.content.standings.groups[1].standings.entries
        let east = data.content.standings.groups[0].standings.entries
        conference = conference == 'west' ? west : east
        //Aca queda un array de length 15. 
        //Hay que loopear la array que corresponda segun el click que se hizo
        /* foreach equipo => 
            let nombre = equipo.team.displayName
            let record = equipo.stats[0].displayValue + equipo.stats[1].displayValue
        */

        document.querySelector('.basketball').style.display = 'none';
        //Como ya tengo cual debo loopear simplemnte loopeo y populo template
        let bodyTabla = document.getElementById('bodyTabla');
        console.log(bodyTabla)
        conference.forEach(equipo => {
          console.log(equipo)
          let nombre = equipo.team.displayName
          let wins = equipo.stats[0].displayValue
          let loses = equipo.stats[1].displayValue
          let seed = equipo.team.seed
          console.log(equipo, nombre)
          //Referencia al body de la tabla para appendarle las rows
          let bodyTabla = document.querySelector('#bodyTabla')
          let tr = generarTemplateTr(seed,nombre, wins, loses)
          bodyTabla.appendChild(tr);
        })

      })
      .catch(error => console.error('Fetch error:', error));
}

function generarTemplateTr(seed,nombre, wins, loses){
  let tr = document.createElement("tr")
  let template = `
            <td>${seed}</td>
            <td><img class="team-logo" src="/images/${nombre.replace(/\s/g, '')}.png" alt="Team 1 Logo"> ${nombre} </td>
            <td>${wins}</td>
            <td>${loses}</td>
          `;
  tr.innerHTML = template;
  return tr;
 }