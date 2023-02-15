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

//dom pointers to buttons for random searches
let nebula = document.querySelector("#nebula")
let liftoff = document.querySelector("#liftoff")
let moon = document.querySelector("#moon")
let deleteButton = document.querySelector("#delete")

//dom pointers to Social media links
let twitter = document.querySelector("#twitter")
let facebook = document.querySelector("#facebook")
let linkedin = document.querySelector("#linkedin")
let email = document.querySelector("#mail")

//selects for user generated data
const searchSubmit = document.querySelector('#search-bar');

//variables for nav list of favorited images
let nav = document.querySelector('#favorites-list')
const favButton = document.querySelector('#saved')

let moreText = document.querySelector('#more-text');
let moreTextDisplayed = document.querySelector('#more-text-displayed');

//functionality for submitting a search
//brings up a random image from Nasa API 
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

//Button Event Listeners
//  these will generage a random search image
//  for the user
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

//functionality for populating references to social media button
function updateMediaLinks(imgUrl){
    console.log(imgUrl)
    facebook.href =`https://www.facebook.com/sharer/sharer.php?u=${imgUrl}` 

    twitter.href=`https://twitter.com/intent/tweet?url=${imgUrl}`
    
    linkedin.href=`https://www.linkedin.com/shareArticle?mini=1&url=${imgUrl}`
    
    let subject = "Cool image!"
    mail.href=`mailto:?subject=${subject}&body=Check out this Image: ${imgUrl}`
    
}

//this is the function that shows the user info from Nasa API,
//  and also from clicking on a fav image
function populateDataWithRandObj(obj){
    let array = obj.collection.items;//an array of objects
    let randomObject = array[Math.floor(Math.random()*array.length)]; //creates a random object from api
    let randomImage = randomObject.links[0].href; //selects link to random image
    let randomDescription = randomObject.data[0].description;
    let articleId = randomObject.data[0].nasa_id
    let articleLink = `https://images.nasa.gov/details-${articleId}`
    
    let randomTitle = randomObject.data[0].title;
    let randomDate = randomObject.data[0]['date_created'];
    let randomKeywords = randomObject.data[0].keywords;

    console.log(articleLink)
    updateMediaLinks(randomImage)

    randomKeywords.forEach((keyword) =>{
        let keywordLi = document.createElement('li');
        keywordLi.innerText = keyword;
        h3.appendChild(keywordLi) 
    })

    currRandomImage = randomImage;
    currRandomTitle = randomTitle;
    currRandomDescription = randomDescription;
    currRandomDate = randomDate;

    date.innerText = `Date Photograph Captured: ${randomDate.slice(0,10)}`;
    image.src=randomImage;
    h1.innerText = randomTitle;
    p.innerText = `${randomDescription.slice(0, 200)}...` 

    moreText.addEventListener('click', (e)=>{
        toggleText()
    })    

    //helps the user see more or less of the description 
    function toggleText(){
        if (moreText.innerText ==="show more") {
            moreTextDisplayed.innerText = randomDescription;
            moreTextDisplayed.style.display = "inline";
            p.style.display ='none'
            moreText.innerText = "show less";
            console.log(moreText.innerText)
        }
        else {
            moreTextDisplayed.style.display = "none";
            p.innerText = `${randomDescription.slice(0, 200)}...`;
            p.style.display="inline";
            moreText.innerText="show more";
        }    
    }
}

//pushes the favorites to db.json, which is hid on GitHub
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
            id:setId,
          }),
        })
        .then(res=>res.json())  
}

//popluates the favorite cards on the bottom of the screen
    //can perform one card at a time 
    //or can populate all cards at once upon a refresh with the doRandom
    //parameter
function makingFavorite(img, id, doRandom){
    let newFavWrap = document.createElement('div');
    newFavWrap.classList.add('fav-trash');
    nav.appendChild(newFavWrap);

    let newFav =document.createElement("img");
    if(doRandom){
    newFav.src = currRandomImage;
    newFav.id = currRandomId;
    }
    else{
        newFav.src = img;
        newFav.id = id;
    }
    
    newFav.classList.add('fav-images');
    newFav.addEventListener('click', (e)=>{
        displayFavoriteImageByIdFromDatabase(newFav.id)
    })

    newFavWrap.appendChild(newFav);

    let deleteBtn = document.createElement("img");
    deleteBtn.classList.add("deleteFaveBtn")
    deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png" 
    newFavWrap.appendChild(deleteBtn);

    //deletes one card from our favorites array 
    deleteBtn.addEventListener('click', (e)=>{
        //removes the button and the image from the favorites list

        let targetImg = e.target.previousElementSibling        
        targetImg.remove();
        deleteBtn.remove();
        
        fetch(`http://localhost:3000/favorites/${newFav.id}`, {
            method:"DELETE",
        })
    })

    //sweet functionality for the favorited image and trashcan
    deleteBtn.addEventListener('mouseover', (event)=>{
        deleteBtn.src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png";
        
    })
    deleteBtn.addEventListener('mouseout', (event)=>{
        deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png"
    })
    return newFav.id
}

favButton.addEventListener('click', ()=>{
    //this references the returned newFav.id (line222) from our makingFavorite function 
    let makingFavoriteId = makingFavorite("y","x",true);
    
    saveToFavorites(currRandomImage, currRandomDescription, 
        currRandomTitle, currRandomDate, makingFavoriteId);
    //allows the next assigned ID to be incremented by one 
    //necessary to call here
    currRandomId++
})

//populates favorited images from loadFavoritesFromDatabase
function loadFavoritesArray(arr){
    arr.forEach(fave=>{
        let image = fave.image_url;
        let id = fave.id;
        makingFavorite(image, id, false);
    })
    if (arr.length !== 0){
    currRandomId = parseInt(arr[arr.length - 1].id) + 1
    }
    else{
        currRandomId = 1
    }
}

//calls to db.json to fetch favorited images 
function loadFavoritesFromDatabase(){
    fetch("http://localhost:3000/favorites")
    .then(res=>res.json())
    .then(arr1=>{
        loadFavoritesArray(arr1);
        })
}

//deletes all images in favorites array
function deleteAll(){
    fetch("http://localhost:3000/favorites")
    .then(res=>res.json())
    .then(arr=>{
        deleteImageByIdFromArray(arr)})
}


function deleteImageByIdFromArray(arr){
    arr.forEach(element => {
        deleteImageById(element)
    });
}

function deleteImageById(img){
    let id = img.id
    fetch(`http://localhost:3000/favorites/${id}`, {
        method:"DELETE",
        })
}

//helper function for our search buttons up top 
function makeSearch(q){
    fetch(`https://images-api.nasa.gov/search?q=${q}&media_type=image`)
    .then((r)=>r.json())
    .then((data)=>{ 
        populateDataWithRandObj(data);
    })
}

//allow user to click on an image and see the info displayed 
//in the main display section
function displayFavoriteImageByIdFromDatabase(id){
    fetch(`http://localhost:3000/favorites/${id}`).then(res=>res.json()).then(img =>{displayFavoriteImage(img);})
}

function displayFavoriteImage(im){
    date.innerText = `Date Photograph Captured: ${im.date.slice(0,10)}`;
    image.src=im.image_url;
    h1.innerText = im.title;
    p.innerText = `${im.description.slice(0, 200)}...`
}

loadFavoritesFromDatabase();
makeSearch("nebula");