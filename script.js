'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const PROFILE_BTN = document.querySelector('#profile-btn')

// Don't touch this function please
// This function fetches the now playing movies and then render them by using the function renderMovies
let genreBTN = document.querySelector('#genre');
let filterBTN = document.querySelector('#filter');
let genreList = document.querySelector('#genreList');
let filterList = document.querySelector('#filterList');
let homeBtn = document.querySelector('#home');


genreBTN.addEventListener('click' , function(e) {
    genreList.classList.toggle('displayList')
    
})
filterBTN.addEventListener('click' , function(e) {
    filterList.classList.toggle('displayList')
})
const autorun = async () => {

  const movies = await fetchMovies();
  CONTAINER.innerHTML = `<div class="search-box">
  <input type="text" id="searchBar" placeholder="Search">
  <a href="#" class="search-Btn"> <i class="fas fa-search"></i></a>
</div>`;
  renderMovies(movies.results);
};

PROFILE_BTN.addEventListener('click', async () => {
  console.log('Im Here')
  const movies = await fetchMovies();
  console.log(movies);
  fetchProfiles(movies.results);
  })

const fetchProfiles = async (movies)=>{
  CONTAINER.innerHTML = `<div class="search-box">
  <input type="text" id="searchBar" placeholder="Search">
  <a href="#" class="search-Btn"> <i class="fas fa-search"></i></a>
</div>`
  for(let movie of movies){
  const credit = await fetchMovie(movie.id+"/credits")
  console.log(credit);
  renderProfiles(credit);}
    
}

const renderProfiles = (credit) => {
  for(let i = 0; i < 8; i++){
      let cast = credit.cast[i];
      let div = document.createElement('div');
      div.setAttribute('class' , 'actors')
      div.innerHTML=`<img src="${PROFILE_BASE_URL + cast.profile_path}" width=48px  class ="movieImg"/><h3 class = "movieList-Heading">${cast.name}</h3>`
     CONTAINER.appendChild(div) 
    }

}


//https://api.themoviedb.org/3/movie/15054/credits?api_key=542003918769df50083a13c415bbc602&append_to_response=credits

// Don't touch this function please
//this function constructs the api depending on the target
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
// constrcuts an api that fetch a single movie
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCredits = await fetchMovie(movie.id+"/credits");
  console.log(movieRes);
  renderMovie(movieRes,movieCredits);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
//this function fetch the now_playing movies
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
fetchMovies();

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  row.classList.add('row');
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class' , 'movieList')
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster" class = "movieImg">
        <h3 class="movieList-Heading">${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const row = document.querySelector(".row")
const renderMovie = (movie,credit) => {
  row.classList.remove("row");
  CONTAINER.innerHTML = 
    `
        <div class="movie-poster">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             } class = "movie-poster">
        </div>
        <div class="details">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3 class= "castHeading">Cast:</h3>
            <ul id="actors" class="list-unstyled">
            </ul>
        <div class="movieCard">
        
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster" class = "movieImg">
        <h3 class="movieList-Heading">${movie.title}</h3>
        </div>`
    
    for(let i = 0; i < 5; i++){
      let cast = credit.cast[i];
      let actors = document.querySelector('#actors');
      let div = document.createElement('div');
      div.innerHTML=`<img src="${PROFILE_BASE_URL + cast.profile_path}" width=48px/> <h3>${cast.name}</h3>
      `
      actors.appendChild(div);
      
    }
};
homeBtn.addEventListener('click' ,autorun);
document.addEventListener("DOMContentLoaded", autorun);

	