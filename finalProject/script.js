'use strict';

class Person {
    constructor(name, birthYear, homeworld, urlSpecies, urlFilms) {
        this.name = name;
        this.birthYear = birthYear;
        this.homeworld = homeworld;
        this.urlSpecies = urlSpecies;
        this.urlFilms = urlFilms;


    }
}


let totalPages;
let currentPage = 1;

async function loadData() {
    let urlApi = 'https://swapi.dev/api/people';
    if (currentPage > 1 && currentPage <= totalPages) {
        urlApi = `${urlApi}/?page=${currentPage}`;
    }
    const dataForPersons = await getData(urlApi);
    totalPages = Math.ceil(dataForPersons.count / 10);
    const persons = await createPersons(dataForPersons);
    return persons;
}

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function createPersons(data) {
    let persons = [];
    for (let dataForPersons of data.results) {
        const person = new Person(
            dataForPersons.name,
            dataForPersons.birth_year,
            (await getData(dataForPersons.homeworld)).name,
            dataForPersons.species,
            dataForPersons.films
        );
        persons.push(person);
    }
    return persons;
}

const personPlatePlace = document.getElementById('wrap-person-card');

function drawPersons(infoPersons) {
    const personPlate = document.getElementById('personPlate');

    for (let infoPerson of infoPersons) {
        const personPlateClone = personPlate.cloneNode(true);
        personPlateClone.removeAttribute('id');
        personPlatePlace.appendChild(personPlateClone);

        const modalWindow = document.getElementById('my_modal');

        personPlateClone.addEventListener('click', async () => {
            
            document.body.style.overflow = 'hidden';

            const modalContentPlase = document.getElementById('modal_content');
            // add spiecies
            if (!infoPerson.species) {
                let species = 'unknown';
                if (infoPerson.urlSpecies.length > 0) {
                    species = (await getData(infoPerson.urlSpecies[0])).name;
                }
                infoPerson.species = species;
            }

            // add films
            infoPerson.urlFilms.forEach(async function (element) {
                const filmList = document.getElementById('filmList');
                while (filmList.childElementCount > 0) {
                    filmList.lastChild.remove();
                }
                let filmN = await getData(element);
                let filmsNames = filmN.title;

                const liFilmName = document.createElement('li');
                filmList.appendChild(liFilmName);
                liFilmName.innerText = filmsNames;
            });

            const modalCntentFillable = modalContentPlase.getElementsByClassName('person-fillable');

            for (let fillable of modalCntentFillable) {
                let tmp = fillable.dataset.propertyName;
                fillable.innerText = infoPerson[tmp];
            }
            modalWindow.classList.remove('none');
        });



        const fillables = personPlateClone.getElementsByClassName('person-fillable');
        for (let fillable of fillables) {
            let tmp = fillable.dataset.propertyName;
            fillable.innerText = infoPerson[tmp];
        }
    }
}

async function reloadPage() {
    deletePersonCard();
    const persons = await loadData();
    drawPersons(persons);

    const buttons = document.getElementById('buttons');
    if (currentPage > 1) {
        buttons.children["btn-previous"].classList.remove('none');
    } else {
        buttons.children["btn-previous"].classList.add('none');
    }

    if (currentPage > totalPages - 1) {
        buttons.children["btn-next"].classList.add('none');
    } else {
        buttons.children["btn-next"].classList.remove('none');
    }
}


//click transition
function transision(event) {
    if (event.target.id === 'btn-next') {
        currentPage++;
    } else if (event.target.id === 'btn-previous') {
        currentPage--;
    }
    reloadPage().catch();
}

function deletePersonCard() {
    while (personPlatePlace.children.length != 0) {
        personPlatePlace.removeChild(personPlatePlace.firstChild);
    }
}



window.onload = function () {
    reloadPage().catch();

    const buttons = document.getElementById('buttons');
    buttons.addEventListener('click', transision);

    const modalWindow = document.getElementById('my_modal');
    const closeModalWindow = document.getElementById('close_modal_window');

    modalWindow.addEventListener('click', (event) => {
        if (event.target == modalWindow || event.target == closeModalWindow) {
            modalWindow.classList.add("none");
            document.body.style.overflow = '';
        }
    });
};