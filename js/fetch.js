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
      const url = constructSearch('search/movie/',filter);
      const filtred = await fetch(url);
      return filtred.json();
    }
    
    const fetchSearchActors = async (filter)=>{
      const url = constructSearch('search/person/',filter);
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
        const allActors = document.createElement("div");
      allActors.setAttribute("class" , "all-movies")
      CONTAINER.appendChild(allActors);
      for(let movie of movies){
      const credit = await fetchMovie(movie.id+"/credits")
      renderProfiles(credit , allActors);}
        
    }
    
    