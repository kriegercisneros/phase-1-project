// write your code here!
fetch("http://localhost:3000/ducks")

let duckNav = document.querySelector("#duck-nav")

duckNav = document.getElementById("duck-nav")
function addToDuckNavFromArray(ducks){
    for (let duck of ducks){
        console.log(ducks)
        let image = document.createElement("img")
        image.src = duck.img_url;
        image.id = duck.name;

        image.addEventListener('click', (e) => {
            setDisplayDuck(duck)
        })

        duckNav.append(image)
    }

}

function addToDuckNav(){
    fetch("http://localhost:3000/ducks").then(res=>res.json())
    .then(arr =>{addToDuckNavFromArray(arr)})
}


let duckDisplay = document.querySelector("#duck-display")
let duckDisplayName = duckDisplay.querySelector("#duck-display-name")
let duckDisplayImage = duckDisplay.querySelector("#duck-display-image")
let duckDisplayLikes = duckDisplay.querySelector("#duck-display-likes")

// takes data from db
function setDisplayDuck(duck){
    duckDisplayName.textContent = duck.name
    duckDisplayImage.src = duck.img_url
    duckDisplayLikes.textContent = duck.likes + " likes"
}

let likeButton = document.querySelector("#duck-display-likes")
likeButton.addEventListener('click', (e)=>{
    let incrementedLike = parseInt(e.target.textContent) + 1
    e.target.textContent = incrementedLike + " likes"
})

let duckForm = document.querySelector("#new-duck-form")
let submit = duckForm.querySelector('[type="submit"]')
let inputName = duckForm.querySelector("#duck-name-input")
let inputImage = duckForm.querySelector("#duck-image-input")

submit.addEventListener('click', (e)=>{
    e.preventDefault()
    let newDuckName = inputName.value;
    let newDuckImage = inputImage.value;
    //Place holder. we dont really need  newId currently
    let newId = 0
    newDuck = {id : newId,
         name :newDuckName, 
         img_url : newDuckImage, 
         likes : 0, }

    
    addToDuckNavFromArray([newDuck])
    console.log("yay")
})

setDisplayDuck({"name": "Duck", 
"img_url":"https://3.bp.blogspot.com/--XA3iMvaJLY/Tw_GykPs-eI/AAAAAAAAEgU/EmFKS7Cz5xQ/s1600/Duck-04.jpg" , "id": 1, "likes":2})