
//declared variables point to html elements
let searchInput = document.querySelector('#search-input');
let image = document.querySelector('#detail-image');
let h1 = document.querySelector('#image-display-h1');
let h3 = document.querySelector('#some-display-h3');
let p = document.querySelector('#description-display-p');

//selects for user generated data
let userInput = searchInput.value
const searchSubmit = document.querySelector('#search-submit');

//simply a reference to the collected info from our API
    fetch('https://images-api.nasa.gov/search?q=nebula&media_type=image')
    .then((r)=>r.json())
    .then((data)=>{ 
        let array = data.collection.items;//an array of objects
        let randomObject = array[Math.floor(Math.random()*array.length)]; //creates a random object from api
        let randomImage = randomObject.links[0].href; //selects link to random image
        let randomDescription = randomObject.data[0].description;
        let randomTitle = randomObject.data[0].title;
        let randomKeywords = randomObject.data[0].keywords
        console.log(randomDescription);
        console.log(randomImage);
        console.log(randomTitle);
        console.log(randomKeywords);
        console.log(data)

    })

//variables to declare submit button and user name form for future username
// const userName=document.querySelector('#form-div')
// const submitButton=document.querySelector('#form-button');

//eventlistener for submit inquiry event
// searchSubmit.addEventListener('submit', (event)=>{
//     event.preventDeault();
// })
  


function generateRandomImage(info){
    let array = info.collection.items
    let randomItem = array[Math.floor(Math.random()*array.length)];

    image.src = randomItem.links[0]
    // console.log('hello')
}

// submitButton.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     fetch("http://localhost:3000", {
//         method: 'POST',
//         headers: {
//             'content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user : userInput
//         })
//     })
//     .then(response => response.json())
//     .then(data => console.log(data)) 
// })



