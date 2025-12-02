let allCountries = []; // vamos guardar o resultado da API aqui

async function getCountries() {
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,currencies,flags"
    );

    const data = await response.json();
    allCountries = data;   // <--- guarda a lista completa
    renderCountries(data); // renderiza tudo normalmente
}



const list = document.getElementById("countries-list");

function renderCountries(countries) {
    list.innerHTML = "";

    countries.forEach(country => {
        // cria o card
        const card = document.createElement("div");
        card.classList.add("country-card");

        // insere conteúdo
        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
            <p>Capital: ${country.capital?.[0] || "—"}</p>
            <p>Região: ${country.region}</p>
        `;

        // 👉 TORNA O CARD CLICÁVEL
        card.addEventListener("click", () => openModal(country));

        // adiciona o card na lista
        list.appendChild(card);
    });
}

getCountries();



const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {

        const term = searchInput.value.trim().toLowerCase();

        if (term === "") {
            alert("Digite algo para pesquisar.");
            return;
        }

        // filtra usando o nome
        const filtrados = allCountries.filter(c =>
            c.name.common.toLowerCase().includes(term)
        );

        if (filtrados.length === 0) {
            alert("Nenhum país encontrado.");
            return;
        }

        // limpa a lista correta
        list.innerHTML = ""; // <-- CORRETO para seu código (countries-list)

        // renderiza normalmente
        renderCountries(filtrados);
    }
});

const continentSelect = document.getElementById("continent");

continentSelect.addEventListener("change", function () {
    const value = continentSelect.value;

    if (value === "") {
        // mostra todos novamente
        renderCountries(allCountries);
        return;
    }

    // filtra pelos continentes da API
    const filtrados = allCountries.filter(
        country => country.region === value
    );

    renderCountries(filtrados);
});



function openModal(country) {
    const modal = document.getElementById("modal");
    const body = document.getElementById("modal-body");

    body.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" width="150">
        <p><strong>Capital:</strong> ${country.capital?.[0] || "—"}</p>
        <p><strong>Região:</strong> ${country.region}</p>
        <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Idioma:</strong> ${Object.values(country.languages || {})[0] || "—"}</p>
        <p><strong>Moeda:</strong> ${Object.values(country.currencies || {})[0]?.name || "—"}</p>
    `;

    modal.style.display = "flex";

    document.getElementById("close-modal").onclick = () => {
        modal.style.display = "none";
    };
}

