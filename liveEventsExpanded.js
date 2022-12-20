//Retrieving the id from url and storing in a variable id
const id = new URLSearchParams(window.location.search).get("id"); 
//Taking Reference of div..So that we can render data there
const liveEventsContainerEl = document.querySelector(".expandedLiveEventsContainer")
//-------------------------------------------------------------------------------

//Can Ignore The Below Function Because Currently We Are Not Focussing on Manual data 🎉🎉
const renderDetails = async ()=>{
    const res = await fetch(`http://localhost:3000/workshops/${id}`); // Fetching Specific Movie using id
    const liveEvent = await res.json()
    //const {original_title,backdrop_path} = movie; //Destructuring
    console.log(liveEvent)
    const template = `
    <img src="${liveEvent.img}" alt="" />
     <h2>${liveEvent.title}</h2>
     <h3>${liveEvent.watch}</h3>
     <p>${liveEvent.price}</p>
    
    `
    liveEventsContainerEl.innerHTML = template
}

window.addEventListener("DOMContentLoaded",()=>renderDetails())

