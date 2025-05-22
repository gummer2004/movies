
import { getMovieDetails } from "./modules/api.js";
import { config } from "./modules/config.js";

const $ = (selector) => document.querySelector(selector);
const id = 950387;

const getYear = (date) =>{
        const mydate = moment(date);
        return mydate.format('YYYY');
}
const getReleaseDate = (date) =>{
    const mydate = moment(date);
    return mydate.format('MM/DD/YYY');
}
const getRuntime = (length) =>{
    let runtime =""
    runtime += Math.floor(length / 60).toString() +"h ";
    runtime += (length%60).toString() + "m";

    return runtime;
}
const getGenres = (genres) =>{
    let myGenres = "";
    for (let i = 0; i< genres.length ; i++){
        myGenres += genres[i].name; 
        myGenres += ",";
    }
    return myGenres;
}

async function  App() {
    const data =  await getMovieDetails(id);
    console.log(data);
    let movie=`<div class="basis-1/3">
            <img src="${config.image_base_url + data?.poster_path}" alt="${data.title}" class="rounded-xl mx-auto my-auto w-3/4">
        </div>
        <div class="basis-2/3">
            <h2 class="text-3xl font-bold">${data.title} <span class="font-normal">(${getYear(data.release_date)})</span></h2>
            <p> <span class="border border-1 border-solid ">PG</span> 
                <span>${getReleaseDate(data.release_date)}</span> &bullet; 
                <span>${getGenres(data.genres)}</span> &bullet; 
                <span>${getRuntime(data.runtime)}</span>
            </p>
            <p class="italic mt-12">${data.tagline}</p>
            <h3 class="text-xl font-bold">Overview</h3>
            <p>${data.overview}</p>
            <div class="grid grid-cols-2 mt-12">
                <div>
                    <h4 class="font-bold">${data.credits.crew[0].name}</h4>
                    <p>${data.credits.crew[0].job}</p>
                    <h4 class="font-bold">${data.credits.crew[1].name}</h4>
                    <p>${data.credits.crew[1].job}</p>
                </div>
                <div>
                    <h4 class="font-bold">${data.credits.cast[0].name}</h4>
                    <p>${data.credits.cast[0].character}</p>
                    <h4 class="font-bold">${data.credits.cast[1].name}</h4>
                    <p>${data.credits.cast[1].character}</p>
                </div>
            </div>
        </div>`;
    $("#moviedetails").innerHTML = movie;    
}

App()