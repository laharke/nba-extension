
function toggleBackground() {
    if (document.body.style.backgroundColor === "black") {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "black";
    }
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "toggleBackground") {
      toggleBackground();
    }
  });



  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

      //esta es la parte donde yo tendria que popular el form 
      // obviamente si se el ID del input simplemente lo agarro por ref y listo, pero sino lo que puedo hacer
      //es  agarrar el form por getelementsbytagname("form"), dsp acceder a los elements haciendo 
      //let elements = form[0].elements y despues hacer un foreach a todos los elmeentos y dsp si 
      // if (elements[i].id.includes("name")  || elements[i].id.includes("nombre")){ element.value= request.name}

      //de momeno hago un testeo en el HTML test
      document.getElementById("name").value = request.name
      document.getElementById("apellido").value = request.apellido
      document.getElementById("country").value = request.country
      document.getElementById("email").value = request.email
      document.getElementById("birthdate").value = request.birthdate
      sendResponse({status: "Succes!"});
    
  });
