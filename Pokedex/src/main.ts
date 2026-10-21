import * as Utils from './utils.js' ;
import * as Models from './models.js';
import {IPokeApiListItem} from "./models.js";
import {renderitzarLlistaNoms} from "./utils.js";

// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================
// TODO: Implementa la lògica de l'exercici 1 seguint els requisits

const mapaPokkemon = new Map<number, Models.BasePokemon>();

async function carregarllistaPokemon() {
    try{
        Utils.mostrarEstat('Carregar la llista Pokémon...', "loading");

        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if(!resposta.ok){
            throw new Error(`Error HTTP: ${resposta.status}`);
        }

        const dades = (await resposta.json()) as Models.IPokeApiListResponse;

        mapaPokkemon.clear();
        dades.results.forEach((item) => {
            const pokemon = new Models.BasePokemon(item);
            mapaPokkemon.set(pokemon.id, pokemon);
        });

        const llistaPokemon = Array.from(mapaPokkemon.values());
        Utils.renderitzarLlistaNoms(llistaPokemon);
        Utils.amagarEstat();
    }catch (error: unknown) {
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
// TODO: Implementa la lògica de l'exercici 2 seguint els requisits



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