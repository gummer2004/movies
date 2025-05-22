import { getPopularMovies } from "./modules/api.js";

import { config } from "./modules/config.js";

const $ = (selector) => document.querySelector(selector);

async function  App() {
    const data =  await getPopularMovies();
    console.log(data);

    let movies = "";
    for (let i =0; i < data.length ; i++){
        
        movies += `<div class="rounded-xl overflow-hidden border border-2 border-blue-200">
            <img src="minecrafts.jpg" alt="minecraft" class="w-full">
            <p class="text-gray-100 bg-gray-900 inline rounded-full p-1 absolute -mt-4 ml-4 border border-yellow-300 border-2">${data[i].vote_average}</p>
            <div class="p-4">
            <p class="font-semibold">${data[i].title}</p>
            <p class="">${data[i].release_date}</p>
            </div>
        </div>`
    }
    $("#popularmovies").innerHTML = movies;
}
App()