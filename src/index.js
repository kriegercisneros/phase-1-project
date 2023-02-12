
//declared variables point to html elements
let searchInput = document.querySelector('#search-input');
let image = document.querySelector('#detail-image');
let h1 = document.querySelector('#image-display-h1');
let h3 = document.querySelector('#some-display-h3');
let p = document.querySelector('#description-display-p');

//selects for user generated data

const searchSubmit = document.querySelector('#search-bar');


searchSubmit.addEventListener('submit', (event)=>{
    event.preventDefault();
    let userInput = searchInput.value;
    
     fetch(`https://images-api.nasa.gov/search?q=${userInput}&media_type=image`)
    .then((r)=>r.json())
    .then((data)=>{ 
        let array = data.collection.items;//an array of objects
        let randomObject = array[Math.floor(Math.random()*array.length)]; //creates a random object from api
        let randomImage = randomObject.links[0].href; //selects link to random image
        let randomDescription = randomObject.data[0].description;
        let randomTitle = randomObject.data[0].title;
        let randomKeywords = randomObject.data[0].keywords
        // console.log(randomDescription);
        // console.log(randomImage);
        // console.log(randomTitle);
        // console.log(randomKeywords);
    })
})




//variables to declare submit button and user name form for future username
// const userName=document.querySelector('#form-div')
// const submitButton=document.querySelector('#form-button');





