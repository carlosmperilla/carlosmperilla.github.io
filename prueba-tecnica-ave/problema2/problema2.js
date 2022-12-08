
 // Constantes basicas
export const baseUrlType = 'https://pokeapi.co/api/v2/type/';
export const baseUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/';

// Funciones basicas
export async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getPokemonsByType(urlType) {
    let pokemonTypesJson = await fetchAsync(urlType);
    let pokemonsByType = await pokemonTypesJson['pokemon'];
    return pokemonsByType;
}

async function getPokemon(pokemonNameOrId){
    let pokemonJson = await fetchAsync(baseUrlPokemon + pokemonNameOrId);
    return pokemonJson;
}

async function getAttributeByPokemon(pokemonNameOrId, attr){
    let pokemonJson = await getPokemon(pokemonNameOrId);
    let pokemonAttr = await pokemonJson[attr];
    return pokemonAttr;
}


//Suma total de pokemones por tipo, debe recibir el tipo en string.
export async function totalPokemonsByType(type){
    let pokemonsByType = await getPokemonsByType(baseUrlType + type);
    let pokemonJsonTypeLength = await pokemonsByType.length;
    return pokemonJsonTypeLength;
}

// totalPokemonsByType('normal').then((data) => console.log(data) )

//Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos.
export async function pokemonSharedByTwoTypes(typeOne, typeTwo){
    let pokemonsByTypeOne = await getPokemonsByType(baseUrlType + typeOne);
    let pokemonsByTypeTwo = await getPokemonsByType(baseUrlType + typeTwo);

    let pokemonsByTypeOneNames = pokemonsByTypeOne.map((element) => {return element['pokemon']['name']});
    let pokemonsByTypeTwoNames = pokemonsByTypeTwo.map((element) => {return element['pokemon']['name']});
    let pokemonNamesIntersection =  pokemonsByTypeOneNames.filter((pokemonName) => {return pokemonsByTypeTwoNames.includes(pokemonName)});

    return pokemonNamesIntersection;
}

// pokemonSharedByTwoTypes('normal', 'flying').then((data) => console.log(data));

//Dado el nombre de un pokémon retornar el número del mismo.
export async function getIdByPokemon(pokemonName){
    let pokemonId = await getAttributeByPokemon(pokemonName, 'id');
    return pokemonId;
}

// getIdByPokemon('pikachu').then((id) => {console.log(id)});

//Dado el número de un pokémon retornar un objeto con sus 6 stats base.
export async function getPokemonStats(pokemonId){
    let pokemonStats = await getAttributeByPokemon(pokemonId, 'stats');
    return pokemonStats;
}

// getPokemonStats(25).then((stats) => {console.log(stats)});

//Realizar una función que reciba un arreglo de números (Ids de pokémon) y un
//ordenador y retorne los pokémon en un arreglo con su nombre, tipo y peso
//ordenados según se indique por la función por uno de estos 3 indicadores.
function simplifyTypes(pokemonBaseTypes){
    return pokemonBaseTypes.map((type) => {return type['type']['name']});
}

async function extractPokemonNameTypesWeight(pokemonId){
    let pokemon = await getPokemon(pokemonId);
    let { name, types, weight } = await pokemon;
    let pokemonFilter = { name, types, weight };
    pokemonFilter['types'] = simplifyTypes(pokemonFilter['types']);
    return pokemonFilter;
}

async function getSeveralPokemonsById(manyPokemonId){
    let pokemons = [];
    for (let pokemonId of manyPokemonId){
        pokemons.push(await extractPokemonNameTypesWeight(pokemonId));
    }
    return pokemons;
}

export async function getSortedSeveralPokemonsById(manyPokemonId, criteria){
    let pokemons = await getSeveralPokemonsById(manyPokemonId);
    if (criteria !== 'types'){
        pokemons.sort((poka, pokb) => (poka[criteria.toLowerCase()] > pokb[criteria.toLowerCase()]) ? 1 : -1)
    } else {
        pokemons.sort((poka, pokb) => (poka[criteria.toLowerCase()].length > pokb[criteria.toLowerCase()].length) ? 1 : -1)
    }
    return pokemons;
}

// getSortedSeveralPokemonsById([1,2,3,4,5, 6, 7, 8, 9], 'name').then((pokemons) => {console.log(pokemons)})
// getSortedSeveralPokemonsById([1,2,3,4,5, 6, 7, 8, 9], 'weight').then((pokemons) => {console.log(pokemons)})
// getSortedSeveralPokemonsById([1,2,3,4,5, 6, 7, 8, 9], 'types').then((pokemons) => {console.log(pokemons)})

//Recibir un número y un tipo (de pokémon) y retornar un true o false si el
//pokémon de ese número posee este tipo.
export async function pokemonHasType(pokemonId, pokemonType){
    let pokemon = await getPokemon(pokemonId);
    pokemon['types'] = simplifyTypes(pokemon['types']);
    return pokemon['types'].includes(pokemonType);
}

// pokemonHasType(1, 'poison').then(data => console.log(data))
// pokemonHasType(1, 'fire').then(data => console.log(data))
