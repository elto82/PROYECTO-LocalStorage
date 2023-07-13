//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];
const contenido = document.querySelector("#contenido");

//event listeners
eventListeners();

function eventListeners() {
  //cuando se va a agregar un tweet
  formulario.addEventListener("submit", agregarTweet);
  //cuando se carga la pagina
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    crearHTML();
  });
}

//funciones
function agregarTweet(e) {
  e.preventDefault();
  //obtener el valor
  const tweet = document.querySelector("#tweet").value.trim();
  if (tweet === "") {
    mostrarError("Cannot add an empty tweet");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //agregar tweet a la lista
  tweets = [...tweets, tweetObj];
  //console.log(tweets);
  //crear HTML
  crearHTML();
  formulario.reset();
  //hacer que el focus quede en el textarea
  document.querySelector("#tweet").focus();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  contenido.appendChild(mensajeError);
  setTimeout(() => {
    mensajeError.remove();
  }, 2000);
}

function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //crear bton eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList = "borrar-tweet";
      btnEliminar.innerText = "🗑️";
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      //crear elemento li
      const li = document.createElement("li");
      li.innerText = tweet.tweet;
      //agregar boton a
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
//agregar al local storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}
