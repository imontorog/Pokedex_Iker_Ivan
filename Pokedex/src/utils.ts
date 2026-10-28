import * as Models from "./models.js";
import {BasePokemon} from "./models.js";

// ==========================================================
// PART A: FUNCIONS JA IMPLEMENTADES (no cal modificar-les)
// ==========================================================

/**
 * Mostra un missatge d'estat (carregant, error...) a la interfície.
 * Usa-la com a MODEL per escriure les teves pròpies funcions.
 */
export function mostrarEstat(missatge: string, tipus: Models.EstatTipus): void {
    const statusContainer: HTMLElement | null = document.getElementById("status-message");
    if (!statusContainer) return;

    statusContainer.textContent = missatge;
    statusContainer.className = tipus; // el CSS defineix #status-message.loading / .error
}

/**
 * Amaga el missatge d'estat.
 */
export function amagarEstat(): void {
    const statusContainer: HTMLElement | null = document.getElementById("status-message");
    if (!statusContainer) return;

    statusContainer.textContent = "";
    statusContainer.className = "hidden";
}

/**
 * Neteja l'input cercador i torna a mostrar tots els ítems de la llista.
 */
export function netejarCercador(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
    if (searchInput) {
        searchInput.value = "";
    }

    const items: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLLIElement>("#pokemon-list li");
    items.forEach((li: HTMLElement): void => li.classList.remove("hidden"));
}

/**
 * Marca visualment l'element seleccionat a la llista.
 */
export function marcarItemActiu(target: HTMLElement): void {
    const listItem = target.closest("li");
    if (!listItem) return;

    const items = document.querySelectorAll("#pokemon-list li") as NodeListOf<HTMLLIElement>;
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }

    listItem.classList.add("active");
}

/**
 * Torna el panell de detall al seu estat inicial (placeholder).
 */
export function netejarDetallCard(): void {
    const container: HTMLElement | null = document.getElementById("pokemon-detail");
    if (!container) return;

    container.innerHTML = `
        <p class="placeholder">Selecciona un Pokémon de la llista per veure les seves dades.</p>
    `;
}

/**
 * Reprodueix el crit del Pokémon.
 */
export function reproduirCrit(soundUrl: string): void {
    const audio = new Audio(soundUrl);
    audio.play().catch((): void => {
        mostrarEstat("No s'ha pogut reproduir el crit.", "error");
    });
}


// ==========================================================
// PART B: FUNCIONS QUE HAS D'IMPLEMENTAR TU
// ==========================================================

/**
 * EXERCICI 1
 * Renderitza la llista de Pokémon dins de <ul id="pokemon-list">.
 *
 * Requisits:
 *  - Obtenir una instància del contenidor on es mostra la llista de pokémons.
 *  - Buidar el contenidor abans de pintar.
 *  - Per a cada pokémon, crear un <li> amb createElement.
 *  - Desar id a dataset: li.dataset.id
 *  - El text del <li> ha de ser: <strong>#025</strong> - pikachu
 *    (usa els getters formattedId i name).
 *  - Afegir el <li> al contenidor amb appendChild.
 */
// TODO: Implementa la lògica de l'exercici 1 seguint els requisits
export function renderitzarLlistaNoms(llista: Models.BasePokemon[]): void {
    const container = document.getElementById('pokemon-list') as HTMLUListElement | null;
    if (!container) return;

    container.innerHTML = '';

    for (let i: number = 0; i < llista.length; i++) {
        const pokemon: BasePokemon = llista[i];
        const li = document.createElement('li') as HTMLLIElement;

        li.dataset.id = pokemon.id.toString();
        li.dataset.name = pokemon.name;
        li.dataset.url = pokemon.url;

        li.textContent = `${pokemon.formattedId} - ${pokemon.name}`;

        container.appendChild(li);
    }
}


/**
 * EXERCICI 3
 * Renderitza la targeta de detall dins de <div id="pokemon-detail">.
 * Pots crear el HTML com vulguis, però hi ha d'apareixer tota la informació i botons necessaris.
 *
 * Estructura HTML esperada (classes CSS ja definides a style.css):
 *
 *   <div class="detail-card">
 *       <h3>#025 pikachu</h3>
 *       <img src="..." alt="pikachu">
 *       <button id="btn-play-cry" class="btn-cry">🔊 Escolta el crit</button>   <- només si hi ha crit
 *       <p><strong>Pes:</strong> 6 kg</p>
 *       <p><strong>Tipus:</strong> ⚡ Elèctric, ...</p>
 *       <div class="stats-grid">
 *           <div class="stat-box"><span>HP</span><strong>35</strong></div>   <- un per estadística
 *       </div>
 *   </div>
 *
 * Pistes:
 *  - El botó del crit només s'ha de pintar si pokemon.cryUrl no és null.
 *  - Un cop pintat l'HTML, afegeix el listener de clic al botó i crida reproduirCrit().
 */

// TODO: Implementa la lògica de l'exercici 3 seguint els requisits

export function renderitzarDetallCard(pokemon: Models.DetailedPokemon): void {
    const DetallesPokemon = document.getElementById("pokemon-detail") as HTMLDivElement;
    DetallesPokemon.innerHTML = "";
    const card = document.createElement("div");
    card.className = "detail-card";
    const TituloPokemon = document.createElement("h3");
    TituloPokemon.textContent = `${pokemon.formattedId} ${pokemon.name}`;
    const ImagenPokemon = document.createElement("img");
    ImagenPokemon.src = pokemon.imageUrl;
    ImagenPokemon.alt = pokemon.name;
    const PesoPokemon = document.createElement("p");
    PesoPokemon.innerHTML = `<strong>Pes:</strong> ${pokemon.weightKg} kg`;
    const TiposPokemon = document.createElement("p");
    TiposPokemon.innerHTML = `<strong>Tipus:</strong> ${pokemon.types.map(t => t.label).join(", ")}`;

    const EstadisticasPokemon = document.createElement("div");
    EstadisticasPokemon.className = "stats-grid";
    pokemon.stats.forEach(([name, value]) => {
        const Estadistica = document.createElement("div");
        Estadistica.className = "stat-box";
        const NombreEstadistica = document.createElement("span");
        NombreEstadistica.textContent = name.toUpperCase();
        const ValorEstadistica = document.createElement("strong");
        ValorEstadistica.textContent = value.toString();
        Estadistica.append(
            NombreEstadistica,
            ValorEstadistica
        );
        EstadisticasPokemon.append(Estadistica);
    });

    if (pokemon.cryUrl !== null) {
        const SonidoPokemon = document.createElement("button");
        SonidoPokemon.id = "btn-play-cry";
        SonidoPokemon.className = "btn-cry";
        SonidoPokemon.textContent = "🔊 Escolta el crit";
        SonidoPokemon.addEventListener("click", () => {
            reproduirCrit(pokemon.cryUrl!);
        });
        card.append(
            TituloPokemon,
            ImagenPokemon,
            SonidoPokemon,
            PesoPokemon,
            TiposPokemon,
            EstadisticasPokemon
        );
    } else {
        card.append(
            TituloPokemon,
            ImagenPokemon,
            PesoPokemon,
            TiposPokemon,
            EstadisticasPokemon
        );
    }
    DetallesPokemon.append(card);
}


/**
 * EXERCICI 4
 * Genera un botó per a cada tipus dins de <div id="type-filter-container">.
 *
 * Requisits:
 *  - Recupera una instància del contenidor "type-filter-container"
 *  - Recorre el diccionari Models.POKEMON_TYPES (pista: Object.values).
 *  - Per a cada botó afegeix:
 *       btn.className = "btn-type";
 *       btn.dataset.type = el id del tipus
 *       btn.style.backgroundColor = el color del tipus
 *       btn.textContent = el label del tipus
 *  - Recorda afegir el botó correctament al contenidor
 */

// TODO: Implementa la lògica de l'exercici 4 seguint els requisits

export function generarBotonsTipus(): void {
    const container = document.getElementById('type-filter-container');
    if (!container) return;

    container.innerHTML = '';

    const keys = Object.keys(Models.POKEMON_TYPES) as Models.PokemonTypeName[];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const typeObj = Models.POKEMON_TYPES[key];

        const button = document.createElement('button');
        button.className = 'btn-type';
        button.dataset.type = typeObj.id;
        button.style.backgroundColor = typeObj.color;
        button.textContent = typeObj.label;

        container.appendChild(button);
    }
}


