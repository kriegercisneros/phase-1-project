//declared variables to access current object props from 
//outside the f/n in which they are declared 
let currRandomImage;
let currRandomDescription;
let currRandomDate; 
let currRandomTitle;

let currRandomId = 1;

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

//buttons for quick random searches
let nebula = document.querySelector("#nebula")
let liftoff = document.querySelector("#liftoff")
let moon = document.querySelector("#moon")
let deleteButton = document.querySelector("#delete")

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

//event listeners for top div buttons
nebula.addEventListener('click', (e)=>{
    makeSearch("nebula")
})
liftoff.addEventListener('click', (e)=>{
    makeSearch("liftoff")
})
moon.addEventListener('click', (e)=>{
    makeSearch("moon")
})

deleteButton.addEventListener('click',(e)=>{
    deleteAll()
    nav.innerHTML = ""
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
    let smRandomDescription = randomDescription.slice
        (0, randomDescription.indexOf('.'));

    let spanDescription     
    let aDescription = document.createElement('a');
    aDescription.innerText = 'More';
    aDescription.href= 'www.google.com';

    let randomTitle = randomObject.data[0].title;
    let randomKeywords = randomObject.data[0].keywords
    let randomDate = randomObject.data[0]['date_created'];

    currRandomImage = randomImage;
    currRandomTitle = randomTitle;
    currRandomDescription = smRandomDescription;
    currRandomDate = randomDate;
    // currRandomId++;
    // console.log(currRandomId)
    
    
    date.innerText = `Date Photograph Captured: ${randomDate.slice(0,10)}`;
    image.src=randomImage;
    h1.innerText = randomTitle;
    h3.innerText=randomKeywords;
    p.innerText=smRandomDescription;
    p.appendChild(aDescription)
    // image.id=`Main-Image-${currRandomId}`
    // debugger
}



favButton.addEventListener('click',(e)=>{
    let newFavWrap = document.createElement('div');
    nav.appendChild(newFavWrap);


    let newFav =document.createElement("img");
    newFav.src = currRandomImage;
    newFav.id = currRandomId;
    newFav.classList = "fav-elements"
    
    newFavWrap.appendChild(newFav);

    saveToFavorites(currRandomImage, currRandomDescription, 
        currRandomTitle, currRandomDate, newFav.id)
        currRandomId++

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png";
    deleteBtn.classList ="delete-btn";
    deleteBtn.id = `delete-btn-${currRandomId}` 
    newFavWrap.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e)=>{
        //removes the button and the image from the favorites list
        // debugger
        let targetImg = e.target.previousElementSibling//this is the image associated with the traash can        
       
        targetImg.remove();
        deleteBtn.remove();
        
        fetch(`http://localhost:3000/favorites/${newFav.id}`, {
            method:"DELETE",
        })
    })
    deleteBtn.addEventListener('mouseover', (event)=>{
        
        deleteBtn.src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png";
    })
    deleteBtn.addEventListener('mouseout', (event)=>{
        deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png"
    })
})


function saveToFavorites(rImage, rDescription, rTitle, rDate, setId){
   return fetch("http://localhost:3000/favorites", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({
            image_url:`${rImage}`,
            description:`${rDescription}`,
            title:`${rTitle}`,
            date:`${rDate}`,
            id:`${setId}`
          }),
        })
        .then(res=>res.json())
}

function loadFavorite(img, id){
    let newFavWrap = document.createElement('div');
    nav.appendChild(newFavWrap);
}
function loadFavoritesArray(arr){
    arr.forEach(fave=>{
        let image = fave.image_url;
        let id = fave.id;
        loadFavorite(image,id);
    })
    // currRandomId = parseInt(arr[arr.length - 1].id) + 1
    console.log(currRandomId);

    if (arr.length !== 0){
        currRandomId = parseInt(arr[arr.length - 1].id) + 1
        }
        else{
            currRandomId = 1
        }
    }


function deleteAll(){
    fetch("http://localhost:3000/favorites")
    .then(res=>res.json())
    .then(arr=>
        {
            deleteImageByIdFromArray(arr)
        })
}


function deleteImageByIdFromArray(arr){
    arr.forEach(element => {
        deleteImageById(element)
    });
}

function deleteImageById(image){
    let id = image.id
    fetch(`http://localhost:3000/favorites/${id}`, {
        method:"DELETE",
        })
}

function loadFavoritesFromDatabase(){
    fetch("http://localhost:3000/favorites")
    .then(res=>res.json())
    .then(arr=>
        {
            loadFavoritesArray(arr);console.log(arr)
        })
}


function makeSearch(q){
    fetch(`https://images-api.nasa.gov/search?q=${q}&media_type=image`)
    .then((r)=>r.json())
    .then((data)=>
        { 
            populateDataWithRandObj(data);
        })
}

