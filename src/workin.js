function loadFavorite(img, id){
    let newFavWrap = document.createElement('div');
    newFavWrap.classList.add('fav-trash')
    nav.appendChild(newFavWrap);

    let newFav =document.createElement("img");
    newFav.src = img;
    newFav.id = id;
    
    newFavWrap.appendChild(newFav);

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png" 
    deleteBtn.id = 'delete-btn';
    deleteBtn.classList.add("deleteFaveBtn")
    newFavWrap.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e)=>{
        //removes the button and the image from the favorites list
        // debugger
        let targetImg = e.target.previousElementSibling        
       
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
}


//--------------------

function loadFavorite(img, id){
    let newFavWrap = document.createElement('div');
    newFavWrap.classList.add('fav-trash')
    nav.appendChild(newFavWrap);

    let newFav =document.createElement("img");
    newFav.src = img;
    newFav.id = id;
    
    newFavWrap.appendChild(newFav);

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/4441/4441955.png" 
    deleteBtn.id = 'delete-btn';
    deleteBtn.classList.add("deleteFaveBtn")
    newFavWrap.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e)=>{
        //removes the button and the image from the favorites list
        // debugger
        let targetImg = e.target.previousElementSibling        
       
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
}

