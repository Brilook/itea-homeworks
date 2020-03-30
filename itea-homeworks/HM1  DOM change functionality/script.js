'use strict';

let model = {
    items: [
        'aaaaa',
        'bbbbb',
        'ccccc',
        'bbbbb',
        'eeeee',

    ],
    selectedIndex: -1
};

const firstItem = document.querySelector('.first-item');
const lastItem = document.querySelector('.last-item');
const nextItem = document.querySelector('.next-item');
const previousItem = document.querySelector('.previous-item');
const addItem = document.querySelector('.add-item');
const deleteItem = document.querySelector('.delete-item');
const addTopItem = document.querySelector('.add-to-top-item');




const render = function () {
    const ul = document.getElementById('list');

    while (ul.childElementCount) {
        ul.firstElementChild.remove();
    }


    for (let i = 0; i < model.items.length; i++) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.appendChild(document.createTextNode(model.items[i]));
        ul.appendChild(li);


        if (i === model.selectedIndex) {
            li.classList.add('active');
        }
    }

};
render();


firstItem.addEventListener('click', function () {
    model.selectedIndex = 0;
    render();
});

lastItem.addEventListener('click', function () {
    model.selectedIndex = model.items.length - 1;
    render();
});

nextItem.addEventListener('click', function () {
    if (model.selectedIndex === model.items.length - 1) {
        model.selectedIndex = -1;
    }
    model.selectedIndex++;
    render();
});

previousItem.addEventListener('click', function () {
    if (model.selectedIndex === 0 || model.selectedIndex === -1) {
        model.selectedIndex = model.items.length;
    }
    model.selectedIndex--;
    render();
});

addItem.addEventListener('click', function () {
    let value;
    while (!value) {
        value = window.prompt('Enter value', '11111');
    }
    model.items.push(value);
    model.selectedIndex = -1;
    render();
});

addTopItem.addEventListener('click', function () {
    const value = window.prompt('Enter value', '11111');
    if (value) {
        model.items.unshift(value);
        model.selectedIndex = -1;
        render();
    } else {
        render();
    }
});


deleteItem.addEventListener('click', function (event) {
    if (model.selectedIndex != -1) {
        model.items.splice(model.selectedIndex, 1);
        model.selectedIndex = -1;
        render();
    }
});

// tooltip
let tooltipElem;
deleteItem.addEventListener("mouseover", function (event) {
    if (model.selectedIndex === -1) {
        let target = event.target;

        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;

        const divBtns = document.querySelector('.buttons');
        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);

        let coords = target.getBoundingClientRect();

        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0; 

        let top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) { 
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function (e) {

        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }

    };
});