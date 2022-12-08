const baseUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
let totalPokemonUrl = new URL(baseUrlPokemon);
totalPokemonUrl.searchParams.set('limit', 100000);

const pokemonNamesDatalist = document.getElementById('pokemon-names');

const inputNameOrId = document.querySelector('.pokemon__input');
const buttonForm = document.querySelector('form > button');
const resultsPokemon = document.querySelector('.pokemon--results');
const namePokemon = document.querySelector('.pokemon--results > .pokemon--name');
const idPokemon = document.querySelector('.pokemon--results > .pokemon--id');
const imgPokemon = document.querySelector('.pokemon--results .pokemon--img');
const weightPokemon = document.querySelector('.pokemon--results > .pokemon--weight');
const heightPokemon = document.querySelector('.pokemon--results > .pokemon--height');
const typesPokemon = document.querySelector('.pokemon--results > .pokemon--types');

const backwardImg =  document.querySelector('.pokemon--results .backward--load-img');
const forwardImg =  document.querySelector('.pokemon--results .forward--load-img');
let currentSprites = {pos: 0, sprites: []};

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getPokemon(pokemonNameOrId){
    let pokemonJson = await fetchAsync(baseUrlPokemon + pokemonNameOrId);
    return pokemonJson;
}

function fillPokemonNamesDatalist(){
    fetchAsync(totalPokemonUrl).then(
        (data) => {
            let nameTypes = data["results"].map( pokemonType => pokemonType['name']);
            let options = nameTypes.map((nameType) => {
                let option = document.createElement('option');
                option.value = nameType;
                return option;
            })
            pokemonNamesDatalist.append(...options);
        }
    )
}


function simplifyTypes(pokemonBaseTypes){
    return pokemonBaseTypes.map((type) => {return type['type']['name']});
}

function isValidUrl(urlString){
    try {
        return Boolean(new URL(urlString)); 
    } catch (error) {
        return false;
    }
}

function simplifySprites(pokemonBaseSprites){
    let sprites = Object.keys(pokemonBaseSprites).map( (key) => {
        let value = pokemonBaseSprites[key];
        if (value !== null) {
            if (isValidUrl(value)) {
                return value;
            }
        }
    });
    sprites = sprites.filter( sprite => sprite !== undefined);
    return sprites;
}

async function extractAttrPokemon(pokemonNameOrId){
    let { name, id, types, weight, height, sprites } = await getPokemon(pokemonNameOrId);
    let pokemonData = { name, id, types, weight, height, sprites };
    pokemonData['types'] = simplifyTypes(pokemonData['types']);
    pokemonData['sprites'] = simplifySprites(pokemonData['sprites']);
    return pokemonData;
}

fillPokemonNamesDatalist();
resultsPokemon.style.display =  "none";

buttonForm.addEventListener('click', (e) => {
    e.preventDefault();
    extractAttrPokemon(inputNameOrId.value.toLowerCase()).then(
        (pokemonData) => {
            resultsPokemon.style.display = null;
            namePokemon.innerHTML = "<strong>Nombre: </strong>" + pokemonData.name;
            idPokemon.innerHTML = "<strong>Id: </strong>" + pokemonData.id;
            currentSprites.sprites = pokemonData.sprites;
            currentSprites.pos = 0;
            imgPokemon.src = currentSprites.sprites[currentSprites.pos];
            imgPokemon.alt = pokemonData.name;
            heightPokemon.innerHTML = "<strong>Altura: </strong>" + pokemonData.height;
            weightPokemon.innerHTML = "<strong>Peso: </strong>" + pokemonData.weight;
            typesPokemon.innerHTML = "<strong>Tipos: </strong>" + pokemonData.types.join(', ');
        }
    )
})

backwardImg.addEventListener('click', () => {
    let n = currentSprites.pos;
    let first = 0;
    let last = currentSprites.sprites.length - 1;

    if ((n - 1) < first) {
        currentSprites.pos = last;
    } else {
        currentSprites.pos--;
    }


    imgPokemon.src = currentSprites.sprites[currentSprites.pos];
})

forwardImg.addEventListener('click', () => {
    let n = currentSprites.pos;
    let first = 0;
    let last = currentSprites.sprites.length - 1;
    
    if ((n + 1) > last) {
        currentSprites.pos = first;
    } else {
        currentSprites.pos++;
    }

    imgPokemon.src = currentSprites.sprites[currentSprites.pos];
})