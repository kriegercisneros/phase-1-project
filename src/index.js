// write your code here!


let duckDisplay = document.querySelector("#duck-display")
let duckDisplayName = duckDisplay.querySelector("#duck-display-name")
let duckDisplayImage = duckDisplay.querySelector("#duck-display-image")

// takes data from db
function setDisplayDuck(duck){
    duckDisplayName.textContent = duck.name
    duckDisplayImage.src = duck.img_url
}


setDisplayDuck({"name": "Duck", 
"img_url":"https://3.bp.blogspot.com/--XA3iMvaJLY/Tw_GykPs-eI/AAAAAAAAEgU/EmFKS7Cz5xQ/s1600/Duck-04.jpg" , "id": 1, "likes":2})