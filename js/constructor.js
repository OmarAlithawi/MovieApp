
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