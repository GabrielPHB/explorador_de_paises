async function getCountries() {
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,currencies,flags"
    );
    const data = await response.json();
    renderCountries(data);
}


const list = document.getElementById("countries-list");

function renderCountries(countries) {
    list.innerHTML = "";

    countries.forEach(country => {
        list.innerHTML += `
            <div class="country-card">
                <img src="${country.flags.png}" alt="${country.name.common}">
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital?.[0] || "—"}</p>
                <p>Região: ${country.region}</p>
            </div>
        `;
    });
}

// 👉 Chamar a função aqui:
getCountries();
