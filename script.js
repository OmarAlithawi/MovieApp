'use strict';

//////////////////////Variables////////////////////

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const PROFILE_BTN = document.querySelector('#profile-btn');
const DROPDOWNFILTER = document.querySelectorAll('.dropDown_filter');
const DROPDOWNGENRE = document.querySelectorAll('.dropDown_genre');
let searchBtn = document.querySelector('#search-btn');
let movieType='now_playing';
const SEARCHHTML =`<div class="search-box">
<input type="text" id="searchBar" placeholder="Search">
<a  href="#" class="search-Btn" id="search-btn"> <i class="fas fa-search"></i></a>
</div>`;
let genreBTN = document.querySelector('#genre');
let filterBTN = document.querySelector('#filter');
let homeBtn = document.querySelector('#home');
const row = document.querySelector(".row");

////////////////////////////URL CONSTRUCTORS///////////////////////

const constructSearch = (path,search) => {
  return `${TMDB_BASE_URL}/${path}?api_key=542003918769df50083a13c415bbc602&language=en-US&query=${search}&page=1&include_adult=false`;
};

const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

const constructGenre = (path, genreId) =>{
  return `${TMDB_BASE_URL}/${path}?api_key=542003918769df50083a13c415bbc602&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
}

const constructPerson = (personId) => {
  return`${TMDB_BASE_URL}/person/${personId}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
}

const constructKnown = (personId) => {
  return`${TMDB_BASE_URL}/person/${personId}/movie_credits?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
}

////////////////////////////Initialization////////////////////////

const autorun = async (filter="now_playing") => {
  const movies = await fetchMovies(filter);
  renderMovies(movies.results);
};

const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCredits = await fetchMovie(movie.id+"/credits");
  const movieTrailer = await fetchMovie(movie.id+"/videos");
  const movieSimilar = await fetchMovie(movie.id+"/similar");
  renderMovie(movieRes,movieCredits,movieTrailer.results,movieSimilar.results);
};

const presonDetails = async (personId) =>{
  const person = await fetchPerson(personId);
  const knownFor = await fetchKnown(personId);
  renderPerson(person,knownFor.cast);
}

//////////////////Fetching Functions///////////////////

const fetchPerson = async (personId) =>{
const url = constructPerson(personId);
const res = await fetch(url);
return res.json();
}

const fetchKnown = async (personId) =>{
  const url = constructKnown(personId);
  const res = await fetch(url);
  return res.json();
}

const fetchMovies = async (filter) => {
  const url = constructUrl(`movie/${filter}`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const fetchGenre = async (genreId) => {
  const url = constructGenre('discover/movie', genreId)
  const res = await fetch(url);
  return res.json();
}


const fetchSearch = async (filter)=>{
  const url = constructSearch('search/multi/',filter);
  const filtred = await fetch(url);
  return filtred.json();
}

const fetchProfiles = async (movies)=>{
  CONTAINER.innerHTML = SEARCHHTML;
    searchBtn = document.querySelector('#search-btn');
    const searchBar = document.querySelector('#searchBar');

    searchBtn.addEventListener('click', async (e)=>{
      const search = await fetchSearch(searchBar.value);
      renderMovies(search.results);
    })
  for(let movie of movies){
  const credit = await fetchMovie(movie.id+"/credits")
  renderProfiles(credit);}
    
}



////////////////////////RENDERING FUNCTIONS//////////////////////////

const renderPerson = (person,knownFor) =>{
  row.classList.add('row');
  CONTAINER.innerHTML =`
  
    <div id="actor-card">
        <img src="${PROFILE_BASE_URL + person.profile_path}"class ="movieImg" alt="person">
        <h3 id="actor-name" class ="movieList-Heading">${person.name}</h3>
    </div>
    <div id="actor-details">
        <p><b>Actor popularity :</b> ${person.popularity}</p>
        <p><b>Born :</b> ${person.birthday}</p>
        <p><b>Gender :</b> ${person.gender === 1 ? "Female":"Male"}</p>
        <p><b>Biography :</b> ${person.biography}</p>
    </div>
</div>
<ul id="actors">
</ul>
`
for(let i = 0; i < 5; i++){
  let movie = knownFor[i];
  console.log(movie.id);
  let actors = document.querySelector('#actors');
  let div = document.createElement('div');
  div.innerHTML=`<img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
    movie.title
  } poster" width="48px" heigth="68px">
      <h3>${movie.title}</h3>`
  div.addEventListener('click', (e)=>{
    movieDetails(movie);
  })
  actors.appendChild(div);
}

}

const renderProfiles = (credit) => {
  row.classList.add("row");
  for(let i = 0; i < 8; i++){
      let cast = credit.cast[i];
      let div = document.createElement('div');
      div.setAttribute('class' , 'actors')
      div.innerHTML=`<img src="${PROFILE_BASE_URL + cast.profile_path}" width=48px  class ="movieImg"/><h3 class = "movieList-Heading">${cast.name}</h3>`;
     CONTAINER.appendChild(div)
     div.addEventListener('click', (e)=>{
      presonDetails(cast.id);
    })
    }

}

const renderMovies = (movies) => {
  CONTAINER.innerHTML = SEARCHHTML;
    searchBtn = document.querySelector('#search-btn');
    const searchBar = document.querySelector('#searchBar');
    searchBtn.addEventListener('click', async (e)=>{
      const search = await fetchSearch(searchBar.value);
      renderMovies(search.results);
    })
  row.classList.add('row');
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class' , 'movieList')
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster" class = "movieImg">
        <h3 class="movieList-Heading">${movie.title}</h3>
        <div class="hover-more-detials">
        <h4>${movie.release_date}</h4>
        <h4>${movie.vote_average} / 10 <i class="fas fa-star"></i></h4>
        </div>`
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

const renderMovie = (movie,credit,videos,similar) => {
  console.log(credit.crew);
  const director = credit.crew.find((credit)=>{
    return credit.job === "Director"
  });
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
            <p id="movie-release-date"><b>Release Date :</b> ${
              movie.release_date
            }</p>
            <p><b>Movie Language :</b> ${movie.original_language.toUpperCase()}</p>
            <p><b>Rating :</b> &nbsp${movie.vote_average} <i class="fas fa-star"></i>&nbsp&nbsp
            <b>Vote Count : </b>${movie.vote_count} </p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview :</h3>
            <p id="movie-overview">${movie.overview} </p>
            <h3 id="director"><b>Directed By : </b><a href="https://en.wikipedia.org/wiki/${director.name.replace(' ',"_")}" target="_blank">${director.name}</a></h3>
        </div>
        
        
        <h3>Produced By<h3>
        <div>
            <h4>${movie.production_companies[0].name}</h4>
            <img src=${PROFILE_BASE_URL + movie.production_companies[0].logo_path} width="50px">
        </div>
            <h3 class= "castHeading">Cast:</h3>
            <ul id="actors" class="list-unstyled">
            </ul>
            <ul id="similar" class="list-unstyled">
            </ul>
        <iframe class="movie-trailer" src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key:videos[0].key}" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>`
    
    for(let i = 0; i < 5; i++){
      let cast = credit.cast[i];
      let actors = document.querySelector('#actors');
      let div = document.createElement('div');
      div.innerHTML=`<img src="${PROFILE_BASE_URL + cast.profile_path}" width=48px/> <h3>${cast.name}</h3>
      `
      div.addEventListener('click', (e)=>{
        presonDetails(cast.id);
      })
      actors.appendChild(div);
    }

    for (let j = 0 ; j < 5 ; j++){
      let movie = similar[j];
      let similarMovie = document.querySelector('#similar');
      let movieDiv = document.createElement('div');
      movieDiv.classList.add('movieList');
      movieDiv.innerHTML=`<img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
        movie.title
      } poster" class = "movieImg">
          <h3>${movie.title}</h3> class="movieList-Heading"`;
      movieDiv.addEventListener("click", () => {
      movieDetails(movie);
      });
      similarMovie.appendChild(movieDiv);
      

    }
};

///////////////////////NEEDED FUNCTIONS//////////////////////////

const toggle = (e)=>{
  let list=e.target.nextElementSibling;
  list.classList.toggle('displayList')
}

///////////////////////////EVENT LISENETERS/////////////////////

for(let filter of DROPDOWNFILTER){
  filter.addEventListener('click', async (e) => {
    movieType=e.target.id;
    autorun(e.target.id);
  })
}

for(let genre of DROPDOWNGENRE){
  genre.addEventListener('click', async(e)=>{
    const movies = await fetchGenre(e.target.id);
    renderMovies(movies.results);
  })
}

homeBtn.addEventListener('click' , async (e)=>{
  autorun();
});

document.addEventListener("DOMContentLoaded", autorun());

genreBTN.addEventListener('click' , function(e) {
  toggle(e);  
})
filterBTN.addEventListener('click' , function(e) { 
  toggle(e);
})

PROFILE_BTN.addEventListener('click', async () => {
  const movies = await fetchMovies(movieType);
  fetchProfiles(movies.results);
  })


//1- HEADING TO SHOW WHICH PAGE THE USER IS ON 
//2- related movies design should be finished 
//3- fix the multi search STILL
//4- known for movies design to be finished


