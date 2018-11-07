'use strict';

const API_URL = "https://rickandmortyapi.com/api/character";
const tarjeta = document.querySelector('.tarjetas');
const siguiente = document.querySelector('.arrowR');
const anterio = document.querySelector('.arrowL');
const imgRick = document.querySelector('.imgAside');

siguiente.addEventListener('click', pagSiguiente);
anterio.addEventListener('click', pagAnterior);
imgRick.addEventListener('click', inicio);

rickRequest(API_URL);

var informacion;

function inicio(){
  // Agregando la clase hidden a cada tarjeta
  let tarjetasAnteriores = document.querySelectorAll('.tarjeta');
  for(let i = 0; i < tarjetasAnteriores.length; i++) {
    tarjetasAnteriores[i].classList.add('hidden');
  }
  rickRequest(API_URL);
  window.scrollTo(0, 0); //Enciar la pagina al inicio
}

function pagSiguiente(){
  let tarjetasAnteriores = document.querySelectorAll('.tarjeta');
  for(let i = 0; i < tarjetasAnteriores.length; i++) {
    tarjetasAnteriores[i].classList.add('hidden');
  }
  requestNextPage(informacion.next);
  window.scrollTo(0, 0);
}


function pagAnterior(){
  let tarjetasAnteriores = document.querySelectorAll('.tarjeta');
  for(let i = 0; i < tarjetasAnteriores.length; i++) {
    tarjetasAnteriores[i].classList.add('hidden');
  }
  requestNextPage(informacion.prev);
  window.scrollTo(0, 0);
}

function requestNextPage(url) {
  if(url == '') {
    location.reload();
  } else {
    rickRequest(url);
  }
}

function rickRequest(url){
  fetch(url)  // Por default tiene el type GET
    .then(function(respuesta){
      console.log('La Api nos respondio :)');
      return respuesta.json();
    })
    .then(function(resp){
      printLocation(resp.results);
      informacion = resp.info;
    })
    .catch(function(){
      console.log('La Api no nos respondio t_t');
    })
}

// Location es un array de objetos
function printLocation(characters) {

  for(let character of characters) {

    tarjeta.innerHTML += `
    <section class="tarjeta">

      <section class="${character.status}">
      </section>

      <section class="datos">
        <img class="img" src="${character.image}">
        <p class="name">${character.name}</p>
        <p class="creado">id: ${character.id}</p>

        <section class="masDatos">
          <section class="dato">
            <p>Status</p>
          </section>
          <section class="valor">
            <p>${character.status}</p>
          </section>
        </section>

        <section class="masDatos">
          <section class="dato">
            <p>Species</p>
          </section>
          <section class="valor">
            <p>${character.species}</p>
          </section>
        </section>

        <section class="masDatos">
          <section class="dato">
            <p>Gender</p>
          </section>
          <section class="valor">
            <p>${character.gender}</p>
          </section>
        </section>

        <section class="masDatos">
          <section class="dato">
            <p>Origin</p>
          </section>
          <section class="valor">
            <p>${character.origin.name}</p>
          </section>
        </section>

        <section class="masDatos">
          <section class="dato">
            <p>Last Location</p>
          </section>
          <section class="valor">
            <p>${character.location.name}</p>
          </section>
        </section>



     </section>
    `

      //<li class="location ${character.type}"> ${character.name} (${character.type}) </li>
// ${} -> Se usa para poder utilizar valores de los objetos dentro de los backtips y los backtips nos ayudan a modificar el html desde el js
  }
}
