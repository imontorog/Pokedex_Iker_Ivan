import * as Models from './models.js';
import * as Utils from './utils.js';
// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================
const mapaPokemon = new Map();
const cachePokemon = new Map();
async function carregarllistaPokemon() {
    Utils.netejarCercador();
    try {
        Utils.mostrarEstat('Carregant la llista de Pokémon...', 'loading');
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = (await resposta.json());
        mapaPokemon.clear();
        for (let i = 0; i < dades.results.length; i++) {
            const item = dades.results[i];
            const pokemon = new Models.BasePokemon(item);
            mapaPokemon.set(pokemon.id, pokemon);
        }
        const llistaPokemon = Array.from(mapaPokemon.values());
        Utils.renderitzarLlistaNoms(llistaPokemon);
        Utils.amagarEstat();
    }
    catch (error) {
        if (error instanceof Error) {
            Utils.mostrarEstat(`Error en carregar els Pokémon: ${error.message}`, 'error');
        }
        else {
            Utils.mostrarEstat('Error desconegut en carregar els Pokémon.', 'error');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const btnShowAll = document.getElementById('btn-show-all');
    if (btnShowAll) {
        btnShowAll.addEventListener('click', () => {
            carregarllistaPokemon();
        });
    }
});
// ==========================================================
// EXERCICI 2: Cercador en temps real
// ==========================================================
function filtrarPokemon() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput)
        return;
    const query = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll('#pokemon-list li');
    const esNumeric = query !== '' && !isNaN(Number(query));
    for (let i = 0; i <= items.length; i++) {
        const li = items[i];
        const id = li.dataset.id || '';
        const name = (li.dataset.name || '').toLowerCase();
        if (query === '') {
            li.classList.remove('hidden');
        }
        else if (esNumeric) {
            if (Number(id) === Number(query)) {
                li.classList.remove('hidden');
            }
            else {
                li.classList.add('hidden');
            }
        }
        else {
            if (name.includes(query)) {
                li.classList.remove('hidden');
            }
            else {
                li.classList.add('hidden');
            }
        }
    }
    ;
}
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        filtrarPokemon();
    });
}
// ==========================================================
// EXERCICI 3: Detall del Pokémon, cache i crit
// ==========================================================
async function carregarDetallPokemon(id, url) {
    if (cachePokemon.has(id)) {
        const pokemonCached = cachePokemon.get(id);
        Utils.renderitzarDetallCard(pokemonCached);
        return;
    }
    try {
        Utils.mostrarEstat('CARREGANT EL DETALL DEL POKÉMON...', 'loading');
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dadesDetall = (await resposta.json());
        const detailedPokemon = new Models.DetailedPokemon(dadesDetall, url);
        cachePokemon.set(id, detailedPokemon);
        Utils.renderitzarDetallCard(detailedPokemon);
        Utils.amagarEstat();
    }
    catch (error) {
        if (error instanceof Error) {
            Utils.mostrarEstat(`Error en carregar el detall: ${error.message}`, 'error');
        }
        else {
            Utils.mostrarEstat('Error desconegut en carregar el detall.', 'error');
        }
    }
}
const pokemonList = document.getElementById('pokemon-list');
if (pokemonList) {
    pokemonList.addEventListener('click', (event) => {
        const target = event.target;
        const li = target.closest('li');
        if (li && li.dataset.id && li.dataset.url) {
            const id = Number(li.dataset.id);
            const url = li.dataset.url;
            Utils.marcarItemActiu(li);
            carregarDetallPokemon(id, url);
        }
    });
}
// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 4 seguint els requisits
document.addEventListener('DOMContentLoaded', () => {
    Utils.generarBotonsTipus();
    const btnShowAll = document.getElementById('btn-show-all');
    if (btnShowAll) {
        btnShowAll.addEventListener('click', () => {
            carregarllistaPokemon();
        });
    }
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filtrarPokemon();
        });
    }
    const pokemonList = document.getElementById('pokemon-list');
    if (pokemonList) {
        pokemonList.addEventListener('click', (event) => {
            const target = event.target;
            const li = target.closest('li');
            if (li && li.dataset.id && li.dataset.url) {
                const id = Number(li.dataset.id);
                const url = li.dataset.url;
                Utils.marcarItemActiu(li);
                carregarDetallPokemon(id, url);
            }
        });
    }
});
// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 5 seguint els requisits
async function carregarPokemonPerTipus(tipus) {
    Utils.netejarCercador();
    Utils.netejarDetallCard();
    try {
        Utils.mostrarEstat(`Carregant Pokémon del tipus ${tipus}...`, 'loading');
        const resposta = await fetch(`https://pokeapi.co/api/v2/type/${tipus}`);
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = (await resposta.json());
        mapaPokemon.clear();
        for (let i = 0; i < dades.pokemon.length; i++) {
            const entry = dades.pokemon[i];
            const pokemon = new Models.BasePokemon(entry.pokemon);
            if (pokemon.id <= 151) {
                mapaPokemon.set(pokemon.id, pokemon);
            }
        }
        const llistaPokemon = Array.from(mapaPokemon.values());
        Utils.renderitzarLlistaNoms(llistaPokemon);
        Utils.amagarEstat();
    }
    catch (error) {
        if (error instanceof Error) {
            Utils.mostrarEstat(`Error en carregar el tipus: ${error.message}`, 'error');
        }
        else {
            Utils.mostrarEstat('Error desconegut en carregar el tipus.', 'error');
        }
    }
}
const btnShowAll = document.getElementById('btn-show-all');
if (btnShowAll) {
    btnShowAll.addEventListener('click', () => {
        const activeButtons = document.querySelectorAll('#type-filter-container .btn-type.active');
        for (let i = 0; i < activeButtons.length; i++) {
            activeButtons[i].classList.remove('active');
        }
        carregarllistaPokemon();
    });
}
const typeFilterContainer = document.getElementById('type-filter-container');
if (typeFilterContainer) {
    typeFilterContainer.addEventListener('click', (event) => {
        const target = event.target;
        const button = target.closest('button.btn-type');
        if (button && button.dataset.type) {
            const allButtons = typeFilterContainer.querySelectorAll('.btn-type');
            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].classList.remove('active');
            }
            button.classList.add('active');
            carregarPokemonPerTipus(button.dataset.type);
        }
    });
}
//# sourceMappingURL=main.js.map