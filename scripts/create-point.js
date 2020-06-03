
function populateUfs() {
    const ufSelect = document
        .querySelector("select[name=uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

populateUfs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = `<option value>Selecione a Cidade</option>`;
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
        })

}

document
    .querySelector("select[name=uf")
    // change evento de mudar
    .addEventListener("change", getCities);

//Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

selectedItems = [];
function handleSelectedItem(event) {
    const itemLi = event.target;

    //adicionar ou remover um classe
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    // um forma de condicional e retorno de um arrow function
    const alreadySelected = selectedItems.findIndex(item => { return item == itemId });

    if (alreadySelected != -1) {
        //a funcao filter remove um item do array
        const filteredItems = selectedItems.filter(item => {
            console.log(itemId);

            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;
}


