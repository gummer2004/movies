import { getPopularMovies } from "./modules/api.js";

import { config } from "./modules/config.js";

const $ = (selector) => document.querySelector(selector);

const getReleaseDate = ( date ) =>{
    const mydate = moment(date);
    return mydate.format("MMM DD, YYYY");
}


async function  App() {
    const data =  await getPopularMovies();
    console.log(data);

    let movies = "";
    for (let i =0; i < data.length ; i++){
        
        movies += `<div class="rounded-xl overflow-hidden border border-2 border-blue-200">
            <a href="show.html?id=${data[i].id}"><img src="${config.image_base_url + data[i]?.poster_path}" alt="${data[i].title}" class="w-full"></a>
            <p class="text-gray-100 bg-gray-900 inline rounded-full p-1 absolute -mt-4 ml-4 border border-yellow-300 border-2">${Math.round(data[i].vote_average * 10)}</p>
            <div class="p-4">
            <p class="font-semibold"><a href="show.html?id=${data[i].id}" class="hover:text-blue-500" title="Details of ${data[i].title}">${data[i].title}</a></p>
            <p class="">${getReleaseDate(data[i].release_date)}</p>
            </div>
        </div>`
    }
    $("#popularmovies").innerHTML = movies;
}
App()