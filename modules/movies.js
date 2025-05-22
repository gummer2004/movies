
const moviesDiv = document.getElementById("movies")

import { getPopularMovies } from "./api.js";
import { getMovieDetails } from "./api.js";
import { config } from "./config.js";

const IMAGE_BASE_URL = config.image_base_url;

const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
});

export async function renderMovies() {
    const movies = await getPopularMovies();
    console.log(movies);
    moviesDiv.innerHTML = movies?.map(movie => renderSingleMovie(movie)).join("");
}

export async function renderMovieDetail() {
    const movies = await getMovieDetails(params.id);
    console.log(params.id);
    console.log(movies);
    moviesDiv.innerHTML = renderMoiveDetails(movies);
}

function renderSingleMovie(movie) {
    
    return (
        `
        <div class="col-4 col-lg-3 col-xl-2 p-0 m-1 rounded overflow-hidden border">
            <img src="${config.image_base_url + movie?.poster_path}" class="img-fluid" >
            <p class="text-center">${movie.vote_average}</p>
            <p class="text-center"><a href="movie.html?id=${movie.id}"><strong>${movie.title}</strong></a></p>
            <p class="text-center">${movie.release_date}</p>
        </div>
        `
    )
}
function renderMoiveDetails(movie) {
    
    return (
        `
        <div class="col-12 p-4 m-1 rounded overflow-hidden border d-flex bg-image"
            style="
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.95) 100%),url('${IMAGE_BASE_URL + movie?.backdrop_path}');
                background-size: cover;
            "
            >
            <div class="col-3 p-0 rounded border overflow-hidden ">
               <img src="${config.image_base_url + movie?.poster_path}" class="img-fluid" >
            </div>
            <div class="col-8 p-0  overflow-hidden">
                <p class="text-center"><strong>${movie.title}</strong></p>
                <p class="text-center">${movie.release_date}</p>
            </div>
        </div>
        `
    )
}

