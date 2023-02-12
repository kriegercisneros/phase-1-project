
//declared variables point to html elements
let searchInput = document.querySelector('#search-input');
let image = document.querySelector('#detail-image');
let h1 = document.querySelector('#image-display-h1');
let h3 = document.querySelector('#some-display-h3');
let date = document.querySelector('#date');
let p = document.querySelector('#description-display-p');

//selects for user generated data
const searchSubmit = document.querySelector('#search-bar');

//variables for nav list of favorited images
let nav = document.querySelector('#favorites-list')
const favButton = document.querySelector('#saved')

searchSubmit.addEventListener('submit', (event)=>{
    event.preventDefault();
    let userInput = searchInput.value;
    let query = encodeURI(userInput);
    console.log(query)
    
     fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
    .then((r)=>r.json())
    .then((data)=>{ 
        populateDataWithRandObj(data);
    })
})

function populateDataWithRandObj(obj){
    let array = obj.collection.items;//an array of objects
    let randomObject = array[Math.floor(Math.random()*array.length)]; //creates a random object from api
    let randomImage = randomObject.links[0].href; //selects link to random image
    let randomDescription = randomObject.data[0].description;
    let randomTitle = randomObject.data[0].title;
    let randomKeywords = randomObject.data[0].keywords
    let randomDate = randomObject.data[0]['date_created'];
    
    date.innerText = `Date Photograph Captured: ${randomDate.slice(0,10)}`;
    image.src=randomImage;
    h1.innerText = randomTitle;
    h3.innerText=randomKeywords;
    p.innerText=randomDescription;

    favButton.addEventListener('click',(e)=>{
        let newFav =document.createElement("img");
        newFav.src =randomImage;
        nav.appendChild(newFav)
        
    })
}



//variables to declare submit button and user name form for future username
// const userName=document.querySelector('#form-div')
// const submitButton=document.querySelector('#form-button');