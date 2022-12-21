//Taking Reference to attach to the DOM
const recommendedMovieContainerEl = document.querySelector(".recommended_movies_container");
const indianMoviesContainerEl = document.querySelector(".likedIndianMovies_container");
const nowPlayingMoviesContainerEl = document.querySelector(".nowPlayingMovies_container");
const popularMoviesContainerEl = document.querySelector(".popularMovies_container");
const topRatedMoviesContainerEl = document.querySelector(".topRatedMovies_container");
const latestMoviesContainerEl = document.querySelector(".latestMovies_container");
const bollywoodMoviesContainerEl = document.querySelector(".hindiMovies_container");
const trendingMoviesContainerEl = document.querySelector(".trendingMovies_container");

//--------------------------------------------------------------------------------🎅

// variable declaration For the resuseablility while hitting Api End Points
const auth = "57b428c0e112b579eb26e2f43ff08b0f"
const Api_key = "api_key=57b428c0e112b579eb26e2f43ff08b0f"
const Base_Url = "https://api.themoviedb.org/3/"
const img_url = "https://image.tmdb.org/t/p/w500"    //------>  This is the Base URL For Images


const nowPlayingMoviesUrl = Base_Url + "movie/now_playing?" + Api_key+"&language=en-US&page=1";
const popularMoviesUrl = Base_Url + "movie/popular?"+ Api_key+"&language=en-US&page=3";
const topRatedMoviesUrl = Base_Url + "movie/top_rated?" + Api_key+"&language=en-US&page=2";
const latestMoviesUrl = Base_Url + "movie/now_playing?" + Api_key+"&language=en-US&page=2";

const trendingMovieNamesUrl =  Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=ml|bn|ta";
const recommendedMoviesUrl = Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi";
const likedIndianMovies = Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=2&primary_release_year=2022&with_origin_country=IN";
const popularMoviesUrl2= Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2021&with_original_language=ml|bn|ta";

//--------------------------------------------------------------------------
// function to get movies from TMDB API
async function getMovies(url) {
    const fetchedData = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedData.json();
    showMovies(data.results.slice(0,9)); //This Function is Invoked inside getMovies Function so that we can Accept the data fetced from getMovies function as the Argument for showMovies function
}
getMovies(recommendedMoviesUrl);

//-----------------------------------------------------------------
// This function accept data from getMovies function and help to render it on webpage
function showMovies(movies) {
    //Below code for iterating through each movie and render as a template in webpage
    movies.forEach((movie) => {
        //Destructuring of Object done here so that we can unpack properties from object and can use as independent variables in the below block scope
        let { title, poster_path, vote_average, overview, popularity, original_language,id, genre_ids } = movie
        if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
        const movieEl = document.createElement("div")
        let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
        let rndm = Math.floor(Math.random() *genres.length)
        let genresOfMovie = genres[rndm]
        movieEl.classList.add("movies")
        movieEl.innerHTML = `
                 <div class="parent_movie">
                 <a href="./movieExpanded.html?id=${id}"><img src="${img_url + poster_path}" alt="" /></a>
                 <div class="like_vote">
                 <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                 <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                 </div>
                 </div>
                 <h2 style="color: white;font-weight: 100;">${title}</h2>
                 <p style="color: white;font-weight: 100;">${original_language}</p>
                
      `
        recommendedMovieContainerEl.appendChild(movieEl)

    })
    // <p>Likes-${popularity}</p>
    // <p>${vote_average}/10</p>
    //  <p>${genresOfMovie}</p>
    //In line No.53(this May Vary if you format it😶 )  href is written in such a way that we can  track the id of the movie we clicked..Its Written here because commenting is not possible inside the template literal 😐
}

//-------------------------------------------------------------------------------------------------------------------------------

//Upcoming Movies


const getlikedIndianMovies = async function(url) {
   
    const fetchedDataOfLikedIndianMovies = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfLikedIndianMovies.json();
    console.log(data.results)
    showLikedIndianMovies(data.results)
}

getlikedIndianMovies(likedIndianMovies)


function  showLikedIndianMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const indianEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
        let rndm = Math.floor(Math.random() *genres.length)
        let genresOfMovie = genres[rndm]
         indianEl.classList.add("indian_movies")
         indianEl.innerHTML = `
               <div class="parent_movie"> 
                 <a href="./likeIndianMovies.html?id=${id}"><img src="${poster_path?img_url + poster_path:img_url+"/w896mqGi91LrTp2pUsc8a9QAbyL.jpg"}" alt="" /></a>
                 <div class="like_vote">
                  <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                  <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                  </div>
                </div>
                <h2>${title}</h2>
                <p>${genresOfMovie}</p>
       `
       indianMoviesContainerEl.appendChild(indianEl)
    })
    // <p>Likes-${popularity}</p>
    //               <p>rating-${vote_average}</p>
    //               <p>releasedate-${release_date}</p>
    //               <p>Language-${original_language}</p>
    
}


//-------------------------------------------------------------------------------------------------------------
//Premering Movies 

const getNowPlayingMovies = async function(url) {
   
    const fetchedDataOfNowPlayingMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfNowPlayingMovies.json();
    console.log(data.results)
    showNowPlayingMovies (data.results)
}
getNowPlayingMovies(nowPlayingMoviesUrl) 

function showNowPlayingMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const nowPlayingEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         nowPlayingEl.classList.add("premeire_movies")
         nowPlayingEl.innerHTML = `
               <div class="parent_movie"> 
                  <a href="./nowplayingExpanded.html?id=${id}"><img src="${img_url + poster_path}" alt="" /></a>
                  <div class="like_vote">
                  <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                  <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                  </div>
                </div>
                  <h2>${title}</h2>
                 <p>${genresOfMovie}</p>
       `
       nowPlayingMoviesContainerEl.appendChild(nowPlayingEl)
    })
    // <p>Likes-${popularity}</p>
    // <p>rating-${vote_average}</p>
    // <p>releasedate-${release_date}</p>
    // <p>Language-${original_language}</p>
    
}



//---------------------------------------------------------------------------------------------------------------------------------

//popular



const getPopularMovies = async function(url) {
   
    const fetchedDataOfGetPopularMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfGetPopularMovies.json();
    console.log(data.results);
    showPopularMovies (data.results)
}
getPopularMovies(popularMoviesUrl2) 


function showPopularMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const popularMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         popularMoviesEl.classList.add("popular_movies")
         popularMoviesEl.innerHTML = `
               <div class="parent_movie"> 
                  <a href="./popularExpanded.html?id=${id}"><img src="${img_url + poster_path}" alt="" /></a>
                  <div class="like_vote">
                  <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                  <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                  </div>
                </div>
                  <h2>${title}</h2>
                  <p>${genresOfMovie}</p>
       `
       popularMoviesContainerEl.appendChild(popularMoviesEl)
    })
                //   <p>Likes-${popularity}</p>
                //   <p>rating-${vote_average}</p>
                //   <p>releasedate-${release_date}</p>
                //   <p>Language-${original_language}</p>
    
}


//----------------------------------------------------------------------

//Top Rated

const getTopRatedMovies = async function(url) {
   
    const fetchedDataOfTopRatedMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfTopRatedMovies.json();
    console.log(data.results);
    showTopRatedMovies (data.results)
}
getTopRatedMovies(topRatedMoviesUrl) 


function showTopRatedMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const topRatedMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         topRatedMoviesEl.classList.add("topRated_movies")
         topRatedMoviesEl.innerHTML = `
                <div class="parent_movie"> 
                  <a href="./topRatedExpanded.html?id=${id}"><img src="${img_url + poster_path}" alt="" /></a>
                  <div class="like_vote">
                  <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                  <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                  </div>
                </div>
                  <h2>${title}</h2>
                  <p>${genresOfMovie}</p>
       `
       topRatedMoviesContainerEl.appendChild(topRatedMoviesEl)
    })
                //   <p>Likes-${popularity}</p>
                //   <p>rating-${vote_average}</p>
                //   <p>releasedate-${release_date}</p>
                //   <p>Language-${original_language}</p>
    
}

//-------------------------------------------------------------------------------------------------------------

//Latest Movies


const getLatestMovies = async function(url) {
   
    const fetchedDataOfLatestMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfLatestMovies.json();
    console.log(data.results);
    showLatestMovies(data.results)
}
getLatestMovies(latestMoviesUrl);


function showLatestMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const latestMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         latestMoviesEl.classList.add("latest_movies")
         latestMoviesEl.innerHTML = `
              <div class="parent_movie"> 
                  <a href="./latestMovieExpanded.html?id=${id}"><img src="${img_url + poster_path}" alt="" /></a>
                  <div class="like_vote">
                  <p><i class="fa-solid fa-thumbs-up"></i> ${Number(popularity/10).toFixed(1)}k likes</p>
                  <p><i class="fa-solid fa-star"></i> ${vote_average}/10</p>
                  </div>
               </div>
                  <h2>${title}</h2>
                  <p>${genresOfMovie}</p>
       `
       latestMoviesContainerEl.appendChild(latestMoviesEl)
    })

    // <p>Likes-${popularity}</p>
    // <p>rating-${vote_average}</p>
    // <p>releasedate-${release_date}</p>
    // <p>Language-${original_language}</p>
    
}

//------------------------------------------------------------------------------------------------------------------------------

//Trending Searches

const getTrendingMovies = async function(url) {
   
    const fetchedDataOfTrendingMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfTrendingMovies.json();
    console.log(data.results);
    showTrendingMovies(data.results.slice(3,17));
}
getTrendingMovies(trendingMovieNamesUrl);


function showTrendingMovies(movies){
    movies.forEach(movie => {
        let {id, title} = movie;
        const trendingMoviesEl = document.createElement("div")
        trendingMoviesEl.classList.add("trending_movies")
        trendingMoviesEl.innerHTML = `
          <a href="./trendingExpanded.html?id=${id}">
              <p>${title}</p>
          </a>
        
        `
        trendingMoviesContainerEl.appendChild(trendingMoviesEl)
    })
}


