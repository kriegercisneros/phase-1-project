//declared variables to access current object props from 
//outside the f/n in which they are declared 
let currRandomImage;
let currRandomDescription;
let currRandomDate; 
let currRandomTitle;

//declared variables point to html elements
let searchInput = document.querySelector('#search-input');
let image = document.querySelector('#detail-image');
let h1 = document.querySelector('#image-display-h1');
let h3 = document.querySelector('#some-display-h3');
let date = document.querySelector('#date');
let p = document.querySelector('#description-display-p');
let wrap = document.querySelector('#delete-btn-wrap');

//selects for user generated data
const searchSubmit = document.querySelector('#search-bar');

//variables for nav list of favorited images
let nav = document.querySelector('#favorites-list')
const favButton = document.querySelector('#saved')

searchSubmit.addEventListener('submit', (event)=>{
    event.preventDefault();
    let userInput = searchInput.value;
    let query = encodeURI(userInput);
    if(userInput === ''){
        askForInput()
    }
    else{
        fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
        .then((r)=>r.json())
        .then((data)=>{ 
            populateDataWithRandObj(data);
        })
    }   
})

//make this an inline function 
function askForInput(){
    alert("Enter a space search")
}

function populateDataWithRandObj(obj){
    let array = obj.collection.items;//an array of objects
    let randomObject = array[Math.floor(Math.random()*array.length)]; //creates a random object from api
    let randomImage = randomObject.links[0].href; //selects link to random image
    let randomDescription = randomObject.data[0].description;
    let randomTitle = randomObject.data[0].title;
    let randomKeywords = randomObject.data[0].keywords
    let randomDate = randomObject.data[0]['date_created'];

    currRandomImage = randomImage;
    currRandomTitle = randomTitle;
    currRandomDescription = randomDescription;
    currRandomDate = randomDate;
    
    date.innerText = `Date Photograph Captured: ${randomDate.slice(0,10)}`;
    image.src=randomImage;
    h1.innerText = randomTitle;
    h3.innerText=randomKeywords;
    p.innerText=randomDescription;
    console.log(randomKeywords)
}

favButton.addEventListener('click',(e)=>{
   
    let newFav =document.createElement("img");
    newFav.src = currRandomImage;
    nav.appendChild(newFav);
    saveToFavorites(currRandomImage, currRandomDescription, 
        currRandomTitle, currRandomDate)

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png" 
    wrap.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e)=>{
        //removes the button and the image from the favorites list
        let targetImg = e.target.parentElement.nextElementSibling;
        targetImg.remove();
        deleteBtn.remove()

    })
})


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