const listaTweets = document.getElementById("lista-tweets");

eventListeners();

function eventListeners() {
  document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    const tweet = document.getElementById("tweet").value;
    console.log(tweet);
    //Btn Eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerHTML = "X";

    //Listado
    const li = document.createElement("LI");
    li.innerHTML = tweet;
    //Agregar btn Borrar
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);

    //Agregar al Local Storage
    agregarTweetLocalStorage(tweet);
  });

  //** Borrar Tweets
  listaTweets.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "borrar-tweet") {
      console.log(e.target.parentElement.remove());
      borratTweetLocalStorage(e.target.parentElement.innerText);
    } else {
      console.log("Click en No eliminar");
    }
  });

  //** Cargar Contenido
  document.addEventListener("DOMContentLoaded", (e) => {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach((tweet) => {
      const botonBorrar = document.createElement("a");
      botonBorrar.classList = "borrar-tweet";
      botonBorrar.innerHTML = "X";

      //Listado
      const li = document.createElement("LI");
      li.innerHTML = tweet;
      //Agregar btn Borrar
      li.appendChild(botonBorrar);
      listaTweets.appendChild(li);
    });
  });
}

function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  console.log(tweets);
  //Añadir Nuevo tweet

  tweets.push(tweet);
  //Converitr se String a arreglo
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// ** Compreuba elementos del localstorage
function obtenerTweetsLocalStorage() {
  let tweets;
  //Revizar valores localStorage

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
    console.log(localStorage.getItem("tweets"));
  }
  return tweets;
}

// ** Eliminar Twwet de localSotrage

function borratTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  //Elimina la X del Tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet, index) => {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
