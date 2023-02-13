
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
    // console.log(query)
    
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
    console.log(randomKeywords)

    //this code works, but when I run my debugger, 
    //JS runs the pogam three times.  Any way
    //around this? 
    favButton.addEventListener('click',(e)=>{
        debugger
        console.log(randomImage)
        let newFav =document.createElement("img");
        newFav.src =randomImage;
        nav.appendChild(newFav);

        saveToFavorites(randomImage, randomDescription, randomTitle, randomDate)
        // .then(_=>{randomImage=''})
        
    })
}



//variables to declare submit button and user name form for future username
// const userName=document.querySelector('#form-div')
// const submitButton=document.querySelector('#form-button');

function saveToFavorites(rImage, rDescription, rTitle, rDate){
    fetch("http://localhost:3000/favorites", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json",
          },
          body: JSON.stringify({
            image_url:`${rImage}`,
            description:`${rDescription}`,
            title:`${rTitle}`,
            date:`${rDate}`,
          }),
        }).then(res=>res.json()).then(_=>{console.log(_)})  
        
}