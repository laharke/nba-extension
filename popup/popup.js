
const apiUrl = "https://www.balldontlie.io/api/v1/games?dates[]=";
document.addEventListener('DOMContentLoaded', function () {
      
    
      // Make a simple GET request to a sample API
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
});

function generarPartido(partido) {
  //Div del partido
  let partidoContainer = document.createElement('div');
  partidoContainer.className = 'match-score-container';

  
  //Div del equipo local cambiar nombre de variable dsp
  let equipo1 = document.createElement('div');
  equipo1.className = 'team';

  let logoEquipo1 = document.createElement('img');
  logoEquipo1.src = `../images/${partido.home_team.full_name.replace(/ /g, "")}.png`;
  logoEquipo1.className = 'team-logo';
  console.log(partido.home_team.full_name.split(" ").join("").toLowerCase())
  console.log(partido.home_team.full_name.replace(/ /g, ""))

  let nombreEquipo1 = document.createElement('span');
  nombreEquipo1.className = 'team-name';
  nombreEquipo1.textContent = partido.home_team.full_name;

  let scoreEquipo1 = document.createElement('span');
  scoreEquipo1.className = 'team-score';
  scoreEquipo1.textContent = partido.home_team_score;

  equipo1.appendChild(logoEquipo1);
  equipo1.appendChild(nombreEquipo1);
  equipo1.appendChild(scoreEquipo1);

  //Separator
  let separator = document.createElement('div');
  separator.className = 'separator';
  separator.textContent = '-';


  //Div del equipo visitante cambiar nombre de variable dsp
  let equipo2 = document.createElement('div');
  equipo2.className = 'team';

  let scoreEquipo2 = document.createElement('span');
  scoreEquipo2.className = 'team-score';
  scoreEquipo2.textContent = partido.visitor_team_score; 

  let nombreEquipo2 = document.createElement('span');
  nombreEquipo2.className = 'team-name';
  nombreEquipo2.textContent = partido.visitor_team.full_name; 

  let logoEquipo2 = document.createElement('img');
  logoEquipo2.src = `../images/${partido.visitor_team.full_name.replace(/ /g, "")}.png`;
  logoEquipo2.alt = 'Team 2 Logo';
  logoEquipo2.className = 'team-logo';
  console.log(partido.visitor_team.full_name.replace(/ /g, ""))

  equipo2.appendChild(scoreEquipo2);
  equipo2.appendChild(nombreEquipo2);
  equipo2.appendChild(logoEquipo2);


  partidoContainer.appendChild(equipo1);
  partidoContainer.appendChild(separator);
  partidoContainer.appendChild(equipo2);




  let body = document.getElementById('main-container');
  body.appendChild(partidoContainer);
  //Separator entre partidos?
  let hrDivisor = document.createElement('hr');
  body.appendChild(hrDivisor);
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

  return`${year}-${month}-${day}`;

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
