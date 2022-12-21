const id = new URLSearchParams(window.location.search).get("id");
console.log(id)
const topRatedMoviesContainerEl = document.querySelector(".expandedTopRatedMovie_container")
const moviesYouMayLikeContainerEl = document.querySelector(".moviesYouMayLike_container")

let auth = "57b428c0e112b579eb26e2f43ff08b0f"
let Api_key = "api_key=57b428c0e112b579eb26e2f43ff08b0f"
let Base_Url = "https://api.themoviedb.org/3/"
let Api_url = Base_Url + "/trending/movie/week?" + Api_key
let img_url = "https://image.tmdb.org/t/p/w500"
let upComingMoviesUrl =  Base_Url + "movie/upcoming?" + Api_key
let recommendedMoviesUrl = Base_Url + "movie/now_playing?"+ Api_key+"&language=en-US&page=5"




const renderDetails = async () => {
    const res = await fetch(`${Base_Url}movie/${id}?${Api_key}`); // Fetching Specific Movie Details using id
    const movieData = await res.json()
    const { original_title, backdrop_path, vote_count, vote_average, runtime, release_date, overview, poster_path, genres,spoken_languages,production_companies,adult } = movieData;//Destructuring Optional He😇  
    //We are getting Genres as an array so have to Iterate Over That..We have to delete The Coma Thats coming at the End of very last genre...Will  Rectify it later😒
    let productions= ""
    production_companies.forEach((p)=>{
      productions+=p.name+" "+","
    })
    let languages = ""
    spoken_languages.forEach((l)=>{
      languages+=l.english_name+" "+","
    })
    let gens = ""
    genres.forEach((g) => {
        gens += g.name+ ","
    })
    const template = `
    <div class="main_container">
    <img src = "${img_url}/${poster_path}" alt="" class="poster_img" /> 
    <div class="movie_detail_banner">
            <h1 class="movie_title">${original_title}</h1>
            <div class="movie_rating_voting"> 
            <h3><i class="fa-solid fa-star"></i> ${Number((vote_average).toFixed(1))}/10</h3> 
            <h5>${(vote_count)/1000}k votes</h5>
            </div>
            <div class="your_rating">
            <div class="rating_text">
            <h3>Add your rating & review</h3>
            <p>Your ratings matter</p>
            </div>
            <button class="rate_btn">Rate now</button>
            </div>
            <div class="screens">${productions.slice(0,-1)}</div>
            <div class="languages">${languages.slice(0,-1)}</div>
            <div class="other_detail"><span>${Math.floor(runtime/60)}hr ${runtime%60}mins</span> <span>. </span> <span>${gens.slice(0,-1)}</span><span>. </span> <span>${adult?"U/A":"U"}</span> <span>. </span> <span>${release_date}</span></div>
            <button class="tickt_btn">Book Tickets</button>
        </div>
     </div>
      <div class="about_movie">
           <h1>About the movie</h1>
           <p> ${overview} </p>
      </div>
    
    <div class="offers">
        <h1>Applicable offers</h1>
        <div class="limited_offer">
          <h2>WATCH MOVIES ONLINE FOR FREE</h2>
          <p>Limited Period Offer</p>
        </div>
    </div>
      `
    //I have Written Which is Cover Photo and Which is Profile Pic Inside the Template String And Also Given Small Inline Style Dont forget to delete it While Styling 
    topRatedMoviesContainerEl.innerHTML = template
    renderCast()  //Calling The Function Render The Cast
    renderCrew()  //Calling The Function Render The Crew
    renderReviews() //Calling The Function Render The Reviews
    renderMoviesYouLike()
}




//------------------------------------------------------------------------------------------

//Function That Renders the Cast
const renderCast = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/credits?${Api_key}&language=en-US`); // End Point That Fetch the Cast
    const cast = await res.json()
    let casts = cast.cast.slice(1, 7);

    const castHead=document.createElement("div");
    castHead.innerHTML = `<h1 class="cast_name">Cast</h1>`;
    castHead.classList.add("cast_section");
    const castElCon = document.createElement("div");
    castElCon.classList.add("cast_container");
    castHead.appendChild(castElCon);
    casts.forEach((c) => {
        castElCon.innerHTML += `
        <div class="cast_detail">
          <img src="${img_url}/${c.profile_path}" alt=""/>
          <p>${c.name}</p>
        </div>
          `
          topRatedMoviesContainerEl.appendChild(castHead);
    })
}
//----------------------------------------------------------------------------------------------

//Function That Renders the Crew
const renderCrew = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/credits?${Api_key}&language=en-US`); // End Point That Fetch the Crew
    const crew = await res.json()
    let crews = crew.crew.slice(1, 5)//We are Getting a Buch Of Crews So We Sliced it Out 🐱‍👤
    
    const crewHead=document.createElement("div");
    crewHead.innerHTML = `<h1 class="crew_name">Crew</h1>`;
    crewHead.classList.add("crew_section");
    const crewElCon = document.createElement("div");
    crewElCon.classList.add("crew_container");
    crewHead.appendChild(crewElCon);
    crews.forEach((c) => {
        crewElCon.innerHTML += `
        <div class="crew_detail">
          <img src="${img_url}/${c.profile_path ? c.profile_path : "/5QlzL72Du5zVs1E27pQ0OlFLImI.jpg"}" alt=""/>
          <p>${c.name}</p>
        </div>
         `
        topRatedMoviesContainerEl.appendChild(crewHead);
    })
}

//********************************************************************************************************* */
//Function That Renders the Reviews

const renderReviews = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/reviews?${Api_key}&language=en-US`); // End Point That Fetch the Crew
    const review = await res.json();
    const reviews = review.results.slice(0,2);
   
    const reviewHead = document.createElement("div");
    reviewHead.innerHTML = `
    <div class="review_upPart">
    <h1 class="rivew_name">Top reviews</h1>
    <p> summary of the reviews </p>
    <div class="review_btn">
    <div class="review_btn_box">#superDirection <span>27419</span></div>
    <div class="review_btn_box">#Blockbuster <span>22183</span></div>
    <div class="review_btn_box">#Wellmade <span>20913</span></div>
    <div class="review_btn_box">#Unbelievable <span>20264</span></div>
    <div class="review_btn_box">#GreatActing <span>22364</span></div>
    </div> 
    `;
    reviewHead.classList.add("review_section");
    const reviewCon = document.createElement("div");
    reviewCon.classList.add("review_container");
    reviewHead.appendChild(reviewCon);
    // console.log(reviews)
    reviews.forEach((rev) => {
        let content = rev.content.slice(0, 200);// The Review Content Was So Big So Sliced to 600 Words Including Spaces and punctuations..It will be Nice To change it While Designing
        let imgurl = rev.author_details.avatar_path;
        const rating = rev.author_details.rating;
        reviewCon.innerHTML += `
          <div class="reviews">
          <div class="frst_row_review">
          <img src="${img_url}/${imgurl}" alt=""/>
           <p class="author_name">Author:${rev.author}</p>
           <p><i class="fa-solid fa-star fa-star-review"></i>${rating}/10</p>
           </div>

           <p class="review_content">${content}</p>

           <div class = "last_row_review">
           <div class = "review_like">
           <div> <i class = "fa-regular fa-thumbs-up"></i> <span> 2.1k </span></div> 
           <div><i class = "fa-regular fa-thumbs-down"></i></div>
           </div>
           <div class = "review_share">
           <i class="fa-solid fa-share-nodes"></i>
           <h2>created at:${rev.created_at}</h2>
           </div>
           </div>
          `
       
          topRatedMoviesContainerEl.appendChild(reviewHead);
    })
}

//-----------------------------------------MOVIES YOU MAY LIKE-----------------------------------------

const renderMoviesYouLike = async function() {
    const res = await fetch(recommendedMoviesUrl); // End Point That Fetch the Crew
    const movies = await res.json();
   const mayLikeMovies = movies.results.slice(2,12);
  
  
   mayLikeMovies.forEach((movie) => {
       
    const {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
    const mayLikeCon = document.createElement("div")
    mayLikeCon.classList.add("moviesYouMayLike")
    mayLikeCon.innerHTML = `
             <a href="./topRatedExpanded.html?id=${id}">   
                 <img src="${img_url + poster_path}" alt="" />
             </a>
             <p>${title}</p>
             <p>Likes-${popularity}</p>
             <p>rating-${vote_average}</p>
           
  `
  moviesYouMayLikeContainerEl.appendChild(mayLikeCon)
})

}












window.addEventListener("DOMContentLoaded", () => renderDetails())