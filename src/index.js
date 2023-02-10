let userInput = e.target['input-text'].value;

fetch(`https://images-api.nasa.gov/search?q=&{userInput}&media_type=image`)
.then((resp) => resp.json())
.then((data)=>{
    generateImage(data);
})

const userName=document.querySelector('#form-div')
const submitButton=document.querySelector('#form-button');


submitButton.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    debugger;
    fetch("http://localhost:3000", {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            user : userInput
        })
    })
    .then(response => response.json())
    .then(data => console.log(data)) 
    debugger;
})



