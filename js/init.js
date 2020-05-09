
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