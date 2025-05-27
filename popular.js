import { getPopularMovies } from "./modules/api.js";

import { config } from "./modules/config.js";

const $ = (selector) => document.querySelector(selector);

let page = 1;
const getReleaseDate = ( date ) =>{
    const mydate = moment(date);
    return mydate.format("MMM DD, YYYY");
}
const  displayPopularMovies = async ( page = 1) =>{
    const data =  await getPopularMovies( page );
    console.log(data);

    let movies = "";
    for (let i =0; i < data.length ; i++){
        
        movies += `<div class="rounded-xl overflow-hidden border border-2 border-blue-200">
            <a href="show.html?id=${data[i].id}"><img src="${config.image_base_url + data[i]?.poster_path}" alt="${data[i].title}" class="w-full"></a>
            <p class="text-gray-100 bg-gray-900 inline rounded-full p-1 absolute -mt-4 ml-4 border border-yellow-300 border-2">${Math.round(data[i].vote_average * 10)}<sup>%</sup></p>
            <div class="p-4">
            <p class="font-semibold"><a href="show.html?id=${data[i].id}" class="hover:text-blue-500" title="Details of ${data[i].title}">${data[i].title}</a></p>
            <p class="">${getReleaseDate(data[i].release_date)}</p>
            </div>
        </div>`
    }
    return movies;
}

const loadNextPage = async () =>{
    page = page +1
    $("#popularmovies").innerHTML = await displayPopularMovies(page);
}
const loadPreviousPage = async () => {
    if (page > 1){
     page = page -1
    }
    $("#popularmovies").innerHTML = await displayPopularMovies(page);
}

async function  App() {

    $("#popularmovies").innerHTML = await displayPopularMovies();
 
    $(".next").addEventListener('click',loadNextPage);
    $(".pervious").addEventListener("click",loadPreviousPage);
}
App()