const urlDogRandomImgs = "https://dog.ceo/api/breeds/image/random";
const buttonSubmit = document.querySelector('#solution button[type="submit"]');
const inputImgs = document.querySelector('#solution .imgs__input');
const boxImgs = document.querySelector('.imgs__box');

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function fillBoxImgs(numImgs){
    boxImgs.innerHTML = "";
    for (let i = 0; i < numImgs; i++){
        let boxImg = document.createElement('div');
        let img = document.createElement('img');
        let data = await fetchAsync(urlDogRandomImgs);
        let urlImg = await data['message'];
        img.src = urlImg;
        boxImg.appendChild(img);
        boxImgs.appendChild(boxImg);
    }
    
}

buttonSubmit.addEventListener('click', (e) => {
    let numImgs = parseInt(inputImgs.value);
    
    console.log(numImgs)
    e.preventDefault();
    
    if ((numImgs > 0) && (numImgs <= 15)) {
        fillBoxImgs(numImgs);
    }

})