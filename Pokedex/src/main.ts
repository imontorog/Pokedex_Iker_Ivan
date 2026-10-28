import * as Models from './models.js';
import * as Utils from './utils.js';
import {BasePokemon, IPokeApiListItem} from "./models.js";

// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================

const mapaPokemon = new Map<number, Models.BasePokemon>();
const cachePokemon = new Map<number, Models.DetailedPokemon>();

async function carregarllistaPokemon(): Promise<void> {
    Utils.netejarCercador();
    try {
        Utils.mostrarEstat('Carregant la llista de Pokémon...', 'loading');

        const resposta: Response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }

        const dades = (await resposta.json()) as Models.IPokeApiListResponse;

        mapaPokemon.clear();

        for (let i: number = 0; i < dades.results.length; i++) {
            const item: IPokeApiListItem = dades.results[i];
            const pokemon = new Models.BasePokemon(item);
            mapaPokemon.set(pokemon.id, pokemon);
        }

        const llistaPokemon: BasePokemon[] = Array.from(mapaPokemon.values());
        Utils.renderitzarLlistaNoms(llistaPokemon);
        Utils.amagarEstat();
    } catch (error: unknown) {
        if (error instanceof Error) {
            Utils.mostrarEstat(`Error en carregar els Pokémon: ${error.message}`, 'error');
        } else {
            Utils.mostrarEstat('Error desconegut en carregar els Pokémon.', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', (): void => {
    const btnShowAll = document.getElementById('btn-show-all') as HTMLButtonElement | null;
    if (btnShowAll) {
        btnShowAll.addEventListener('click', (): void => {
            carregarllistaPokemon();
        });
    }
});

// ==========================================================
// EXERCICI 2: Cercador en temps real
// ==========================================================

function filtrarPokemon(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    if (!searchInput) return;

    const query: string = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll('#pokemon-list li') as NodeListOf<HTMLLIElement>;

    const esNumeric: boolean = query !== '' && !isNaN(Number(query));


    for(let i: number = 0; i <= items.length; i++) {
        const li: HTMLLIElement = items[i];
        const id: string = li.dataset.id || '';
        const name: string = (li.dataset.name || '').toLowerCase();

        if (query === '') {
            li.classList.remove('hidden');
        } else if (esNumeric) {
            if (Number(id) === Number(query)) {
                li.classList.remove('hidden');
            } else {
                li.classList.add('hidden');
            }
        } else {
            if (name.includes(query)) {
                li.classList.remove('hidden');
            } else {
                li.classList.add('hidden');
            }
        }
    };
}

const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
if (searchInput) {
    searchInput.addEventListener('input', (): void => {
        filtrarPokemon();
    });
}



// ==========================================================
// EXERCICI 3: Detall del Pokémon, cache i crit
// ==========================================================
async function carregarDetallPokemon(id: number, url: string): Promise<void> {
    if (cachePokemon.has(id)) {
        const pokemonCached = cachePokemon.get(id)!;
        Utils.renderitzarDetallCard(pokemonCached);
        return;
    }

    try {
        Utils.mostrarEstat('CARREGANT EL DETALL DEL POKÉMON...', 'loading');

        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }

        const dadesDetall = (await resposta.json()) as Models.IPokeApiDetail;

        const detailedPokemon = new Models.DetailedPokemon(dadesDetall, url);
        cachePokemon.set(id, detailedPokemon);

        Utils.renderitzarDetallCard(detailedPokemon);
        Utils.amagarEstat();
    } catch (error: unknown) {
        if (error instanceof Error) {
            Utils.mostrarEstat(`Error en carregar el detall: ${error.message}`, 'error');
        } else {
            Utils.mostrarEstat('Error desconegut en carregar el detall.', 'error');
        }
    }
}

const pokemonList = document.getElementById('pokemon-list');
if (pokemonList) {
    pokemonList.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLElement;
        const li = target.closest('li');

        if (li && li.dataset.id && li.dataset.url) {
            const id = Number(li.dataset.id);
            const url = li.dataset.url;

            Utils.marcarItemActiu(id);
            carregarDetallPokemon(id, url);
        }
    });
}



// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 4 seguint els requisits



// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 5 seguint els requisits