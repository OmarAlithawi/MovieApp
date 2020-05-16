"use strict";

//////////////////////Variables////////////////////

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const PROFILE_BTN = document.querySelector("#profile-btn");
const DROPDOWNFILTER = document.querySelectorAll(".dropDown_filter");
const DROPDOWNGENRE = document.querySelectorAll(".dropDown_genre");
let searchBtn = document.querySelector("#search-btn");
let movieType = "now_playing";
const SEARCHHTML = `<div class="search-box">
<input type="text" id="searchBar" placeholder="Search">
<a  href="#" class="search-Btn" id="search-btn"> <i class="fas fa-search"></i></a>
</div>`;
let genreBTN = document.querySelector("#genre");
let filterBTN = document.querySelector("#filter");
let homeBtn = document.querySelector("#home");
const row = document.querySelector(".row");
const HAMBURGER = document.querySelector(".hamburger-box");
const NAV = document.querySelector("nav");
const NAV_ITEMS = document.querySelectorAll(".nav_items");
const FOOTER = document.querySelector(".footer");
const ABOUTBTN = document.querySelector("#about");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
