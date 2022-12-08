import { 
        baseUrlType,
        baseUrlPokemon,
        fetchAsync, 
        totalPokemonsByType, 
        pokemonSharedByTwoTypes,
        getIdByPokemon,
        getPokemonStats,
        getSortedSeveralPokemonsById,
        pokemonHasType
        } from './problema2.js';

let totalPokemonUrl = new URL(baseUrlPokemon);
totalPokemonUrl.searchParams.set('limit', 100000);

const pokemonTypesDatalist = document.getElementById('pokemon-types');
const pokemonNamesDatalist = document.getElementById('pokemon-names');

const pokemonTypesInputOne = document.querySelector('#first-solution .pokemon-types__input');
const pokemonTypesButtonOne = document.querySelector('#first-solution .pokemon-types__button');
const pokemonResultsOne = document.querySelector('#first-solution .results');

const pokemonTypesInputTwoFirst = document.querySelector('#second-solution .pokemon-types__input--first');
const pokemonTypesInputTwoSecond = document.querySelector('#second-solution .pokemon-types__input--second');
const pokemonTypesButtonTwo = document.querySelector('#second-solution .pokemon-types__button');
const pokemonResultsTwo = document.querySelector('#second-solution .results');

const pokemonNamesInputThird = document.querySelector('#third-solution .pokemon-names__input');
const pokemonNamesButtonThird = document.querySelector('#third-solution .pokemon-names__button');
const pokemonResultsThird = document.querySelector('#third-solution .results');

const pokemonIdsInputFourth = document.querySelector('#fourth-solution .pokemon-ids__input');
const pokemonIdsButtonFourth = document.querySelector('#fourth-solution .pokemon-ids__button');
const pokemonResultsFourth = document.querySelector('#fourth-solution .results');

const pokemonIdsInputFifth = document.querySelector('#fifth-solution .pokemon-ids__input');
const pokemonSortedSelectFifth = document.querySelector('#fifth-solution .sorted__select');
const pokemonIdsButtonFifth = document.querySelector('#fifth-solution .pokemon-ids__button');
const pokemonResultsFifth = document.querySelector('#fifth-solution .results');

const pokemonIdsInputSixth = document.querySelector('#sixth-solution .pokemon-ids__input');
const pokemonTypesInputSixth = document.querySelector('#sixth-solution .pokemon-types__input');
const pokemonIdsButtonSixth = document.querySelector('#sixth-solution .pokemon-ids__button');
const pokemonResultsSixth = document.querySelector('#sixth-solution .results');

// Configuraciones basicas
function fillPokemonTypesDatalist(){
    fetchAsync(baseUrlType).then(
        (data) => {
            let nameTypes = data["results"].map( pokemonType => pokemonType['name']);
            let options = nameTypes.map((nameType) => {
                let option = document.createElement('option');
                option.value = nameType;
                return option;
            })
            pokemonTypesDatalist.append(...options);
        }
    )
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

fillPokemonTypesDatalist();
fillPokemonNamesDatalist();

// First solution
pokemonTypesButtonOne.addEventListener('click', (e) => {
    e.preventDefault();
    totalPokemonsByType(pokemonTypesInputOne.value).then(
        (sumValue) => {
            pokemonResultsOne.innerText = sumValue;
        }
    )
})

// Second solution
pokemonTypesButtonTwo.addEventListener('click', (e) => {
    e.preventDefault();
    pokemonSharedByTwoTypes(pokemonTypesInputTwoFirst.value, pokemonTypesInputTwoSecond.value).then(
        (pokemonNames) => {
            let pokemonManyLi = pokemonNames.map(
                (pokemonName) => {
                    let li = document.createElement('li');
                    li.innerText = pokemonName;
                    return li;
                })
            pokemonResultsTwo.replaceChildren(...pokemonManyLi);
        }
    )
})

// Third solution
pokemonNamesButtonThird.addEventListener('click', (e) => {
    e.preventDefault();
    getIdByPokemon(pokemonNamesInputThird.value).then(
        (pokemonName) => {
            pokemonResultsThird.innerText = pokemonName;
        }
    )
})

// Fourth solution
pokemonIdsButtonFourth.addEventListener('click', (e) => {
    e.preventDefault();
    getPokemonStats(pokemonIdsInputFourth.value).then(
        (pokemonStats) => {
            let pokemonStatsLi = pokemonStats.map(
                (pokemonStat) => {
                    let li = document.createElement('li');
                    li.innerText = JSON.stringify(pokemonStat);
                    return li;
                })
            pokemonResultsFourth.replaceChildren(...pokemonStatsLi);
        }
    )
})

//Fifth solution
function parseInputIds(stringIds){
    let ids = stringIds.split(',').map( (stringId) => parseInt(stringId) );
    return ids;
}

pokemonIdsButtonFifth.addEventListener('click', (e) => {
    let manyIds = parseInputIds(pokemonIdsInputFifth.value)
    e.preventDefault();
    getSortedSeveralPokemonsById(manyIds, pokemonSortedSelectFifth.value).then(
        (pokemons) => {
            let pokemonsLi = pokemons.map(
                (pokemon) => {
                    let li = document.createElement('li');
                    let ul = document.createElement('ul');
                    let nameLi = document.createElement('li');
                    let weightLi = document.createElement('li');
                    let typesLi = document.createElement('li');

                    nameLi.innerHTML = "<strong>Nombre: </strong>" + pokemon.name;
                    weightLi.innerHTML = "<strong>Peso: </strong>" + pokemon.weight;
                    typesLi.innerHTML = "<strong>Tipos: </strong>" + JSON.stringify(pokemon.types);

                    ul.append(nameLi, weightLi, typesLi);
                    li.appendChild(ul);
                    return li;
                })
            pokemonResultsFifth.replaceChildren(...pokemonsLi);
        }
    );
})

//Sixth solution
pokemonIdsButtonSixth.addEventListener('click', (e) => {
    e.preventDefault();
    pokemonHasType(pokemonIdsInputSixth.value, pokemonTypesInputSixth.value).then(
        (hasType) => {
            pokemonResultsSixth.innerText =  hasType;
        }
    )
})
