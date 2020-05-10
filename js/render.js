const renderPerson = (person,knownFor) =>{
    console.log(window.pageYOffset);
    let imgLink = checkImg(person.profile_path);
    row.classList.add('row');
    CONTAINER.innerHTML =`
    
      <div id="actor-card">
          <img src="${imgLink}"class ="movieImg" alt="person">
          <h3 id="actor-name" class ="movieList-Heading">${person.name}</h3>
      </div>
      <div id="actor-details">
          <p><b>Actor popularity :</b> ${person.popularity}</p>
          <p><b>Born :</b> ${person.birthday}</p>
          <p><b>Gender :</b> ${person.gender === 1 ? "Female":"Male"}</p>
          <p><b>Biography :</b> ${person.biography}</p>
      </div>
  </div>
  <ul id="actors-movies">
  </ul>
  `
  for(let i = 0; i < 5; i++){
    let movie = knownFor[i];
    let img = checkImg(movie.backdrop_path);
    let actors = document.querySelector('#actors-movies');
    let div = document.createElement('div');
    div.innerHTML=`<img src="${img}" alt="${
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
        let imgLink = checkImg(cast.profile_path);
        let div = document.createElement('div');
        div.setAttribute('class' , 'actors')
        div.innerHTML=`<img src="${imgLink}" width=48px  class ="movieImg"/><h3 class = "movieList-Heading">${cast.name}</h3>`;
       CONTAINER.appendChild(div)
       div.addEventListener('click', (e)=>{
        presonDetails(cast.id);
      })
      }
  
  }
  
  const renderSearchProfiles = (searchResults) => {
    
    for(let i = 0; i < searchResults.length ; i++){
      let cast = searchResults[i];
      let imgLink = checkImg(cast.profile_path);
      let div = document.createElement('div');
      div.setAttribute('class' , 'actors')
      div.innerHTML=`<img src="${imgLink}" width=48px  class ="movieImg"/><h3 class = "movieList-Heading">${cast.name}</h3>`;
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
        const searchPerson = await fetchSearchActors(searchBar.value);
        renderMovies(search.results);
        renderSearchProfiles(searchPerson.results);
      })
  
    row.classList.add('row');
    row.scrollTo(0,0)
  
    movies.map((movie,index) => {
  
      let imgLink =checkImg(movie.backdrop_path);
      const movieDiv = document.createElement("div");
  
      movieDiv.setAttribute('class' , 'movieList')
      movieDiv.innerHTML = `
          <img src="${imgLink}" alt="${
        movie.title
      } poster" class = "movieImg">
          <h3 class="movieList-Heading">${movie.title}</h3>
          <div class="hover-more-detials">
          <h4>${movie.release_date}</h4>
          <h4>${movie.vote_average} / 10 <i class="fas fa-star"></i></h4>
          </div>`
        CONTAINER.appendChild(movieDiv);
        const hoverMoreDetails = document.querySelectorAll('.hover-more-detials')[index];
  
        const genreArr = movie.genre_ids.map((genre)=>{
        const foundGenre =  genres.find((gen) => {
            return gen.id === genre;
          })
          return foundGenre.name === "Science Fiction" ? "Sci-Fi": foundGenre.name;
        }).slice(0,3).join('/')
  
        const genreDetails = document.createElement('h4')
        genreDetails.innerHTML = genreArr;
        hoverMoreDetails.appendChild(genreDetails);
        
  
      movieDiv.addEventListener("click", () => {
        movieDetails(movie);
      });
      
    });
  };
  
  
  
  const renderMovie = (movie,credit,videos,similar) => {
    let imgLink = checkImg(movie.backdrop_path)
    let director = '';
    CONTAINER.scrollTo(0,0)
    row.classList.remove("row");
    CONTAINER.innerHTML = 
      `
          <div class="movie-poster">
               <img id="movie-backdrop" src=${
                 imgLink
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
          </div>
          
          <div class ="production">
            
            <div id="produced-by">
          </div>
          </div>
              <h3 class= "castHeading">Cast:</h3>
              <ul id="actors" class="list-unstyled">
              </ul>

              
              <div id="similar">
              <h4 id="similar-heading">SIMILAR MOVIES</h4></div>
          <iframe class="movie-trailer" src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key:videos[0].key}" 
          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen></iframe>`;
    
     if(credit.crew !== undefined){
    director = credit.crew.find((credit)=>{
      return credit.job === "Director"
    });
    const directorHeading = document.createElement('h3');
    directorHeading.id = director;
    const movieDetail = document.querySelector('.details');
    directorHeading.innerHTML = `<b>Directed By : </b><a href="https://en.wikipedia.org/wiki/${director.name.replace(' ',"_")}" target="_blank">${director.name}</a>`;
    movieDetail.appendChild(directorHeading);
    }
  
    for(let i = 0; i < 5 && i<credit.cast.length; i++){
        let cast = credit.cast[i];
        let img = checkImg(cast.profile_path);
        let actors = document.querySelector('#actors');
        let div = document.createElement('div');
        div.innerHTML=`<img src="${img}" width=48px/> <h3>${cast.name}</h3>
        `
        div.addEventListener('click', (e)=>{
          presonDetails(cast.id);
        })
        actors.appendChild(div);
      }
      
      if(typeof similar[0] === 'object'){
      for (let j = 0 ; j < 6 && j < similar.length ; j++){
        let movie = similar[j];
        let similarMovie = document.querySelector('#similar');
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movieList');
        movieDiv.innerHTML=`<img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
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
        similarMovie.appendChild(movieDiv);
        }}
        
      if(typeof movie.production_companies[0] === 'object'){
        const productionName = document.createElement('h4');
        const productionPicture = document.createElement('img');
        const productionImg = checkImg(movie.production_companies[0].logo_path)
        productionPicture.setAttribute('src', productionImg);
        productionPicture.setAttribute('width', '80px')
        productionName.innerHTML = movie.production_companies[0].name;
        const productionDiv = document.querySelector('#produced-by');
        productionDiv.appendChild(productionName);
        productionDiv.appendChild(productionPicture);
    }else{
        document.querySelector('#produced-by-header').style.display = "none";
        document.querySelector('#produced-by').style.display = "none";
  
    }
    
  };