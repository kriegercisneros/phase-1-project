const userName=document.querySelector('#form-div')
const submitButton=document.querySelector('#form-button');

submitButton.addEventListener('submit', (e)=>{
    e.preventDefault();
    let userInput = e.target['input-text'].value;
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



