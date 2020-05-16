for (let filter of DROPDOWNFILTER) {
  filter.addEventListener("click", async (e) => {
    movieType = e.target.id;
    autorun(e.target.id);
  });
}

for (let genre of DROPDOWNGENRE) {
  genre.addEventListener("click", async (e) => {
    const movies = await fetchGenre(e.target.id);
    renderMovies(movies.results);
  });
}

homeBtn.addEventListener("click", async (e) => {
  autorun();
});

document.addEventListener("DOMContentLoaded", autorun());

genreBTN.addEventListener("click", function (e) {
  toggle(e);
});
filterBTN.addEventListener("click", function (e) {
  toggle(e);
});

PROFILE_BTN.addEventListener("click", async () => {
  const movies = await fetchMovies(movieType);
  fetchProfiles(movies.results);
});

HAMBURGER.addEventListener("click", (e) => {
  NAV.classList.toggle("changeWidth");
  NAV.classList.toggle("smallWidth");
  HAMBURGER.classList.toggle("moveHamburger");
  NAV_ITEMS.forEach((el) => {
    el.classList.toggle("visibiltyTime");
  });
  FOOTER.classList.toggle("hidden");
});

ABOUTBTN.addEventListener("click", renderAbout);
