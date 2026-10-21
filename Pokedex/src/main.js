import * as Models from './models.js';
import * as Utils from './utils.js';
// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================
const mapaPokemon = new Map();
async function carregarllistaPokemon() {
    Utils.netejarCercador();
    try {
        Utils.mostrarEstat('Carregar la llista Pokémon...', "loading");
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = (await resposta.json());
        mapaPokemon.clear();
        dades.results.forEach((item) => {
            const pokemon = new Models.BasePokemon(item);
            mapaPokemon.set(pokemon.id, pokemon);
        });
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
    items.forEach((li) => {
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
    });
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
// TODO: Implementa la lògica de l'exercici 3 seguint els requisits
// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 4 seguint els requisits
// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 5 seguint els requisits
