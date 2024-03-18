// MY PROJECTS
const projects = [
    {"Name": 'Project 1', "Links": 1},
    {"Name": 'Project 2', "Links": 2},
    {"Name": 'Project 3', "Links": 3},
    {"Name": 'Project 4', "Links": 4},
    {"Name": 'Project 5', "Links": 5},
    {"Name": 'Project 6', "Links": 6}
];



const carousel = document.querySelector('.carousel');

// PUTTING EVERY PROJECTS INTO THE CAROUSEL
for(let i = 0; i < projects.length; i++){
    carousel.innerHTML += `<div class="carousel-element"><div>${projects[i].Name}</div></div>`;
}


// SETTING IMPORTANT VARIABLES
let index = 0;
let selectedIndex = 1;
let isRotating = true;
const elements = document.querySelectorAll('.carousel-element');
const titleProjectContainer = document.querySelector('#menuBottomTitle h2');
let totalElements = elements.length;
const visibleElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--visible-elements'));
let gapElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--element-gap').split('px')[0]);
const rotationInterval = 5000; // EVERY 5 SECOND
let rotationTimer = setInterval(() => rotateCarousel('right'), rotationInterval);

// SETTING THE FIRST ELEMENT AS SELECTED
carousel.querySelector('.carousel-element:nth-child('+selectedIndex+')').classList.add('active');

// GET WIDTH OF EACH ELEMENT
const elementWidth = document.querySelector('.carousel-element').clientWidth;

function rotateCarousel(direction){
    const copiedNode = document.querySelectorAll('.carousel .copy');
    let transition = true;

    // GET IN WHICH DIRECTION TO ROTATE
    if(direction === 'right'){
        let maxElements = totalElements;
        maxElements -= 3; // SUBTRACT COPY ELEMENTS

        if(index === maxElements){ // IF WE'RE AT THE END
            index = 0;
            transition = false;
            elements.forEach(el => {
                el.style.transition = 'none';
            });
            copiedNode.forEach(el => {
                el.style.transition = 'none';
            });

        }else index++;
    }else{
        if(index === 0){ // IF WE'RE AT THE BEGINNING
            index = totalElements - visibleElements;
            transition = false;
            elements.forEach(el => {
                el.style.transition = 'none';
            });
            copiedNode.forEach(el => {
                el.style.transition = 'none';
            });

        }else index--;
    }

    // GETTING INFOS OF THE SELECTED PROJECTS
    let selectedIndexProject = index === projects.length ? projects[0] : projects[index];
    titleProjectContainer.innerText = selectedIndexProject.Name;

    // SELECT THE RIGHT ITEM
    selectedIndex = index;
    selectedIndex += 2;
    carousel.querySelectorAll('.carousel-element.active').forEach(elem => {
        elem.classList.remove('active');
    });
    carousel.querySelector('.carousel-element:nth-child('+selectedIndex+')').classList.add('active');

    const offset = index * (elementWidth + gapElements); // HOW MUCH DO EACH ITEMS NEED TO BE MOVED

    // MOVED EVERY PROJECTS ITEM AND PUT A TRANSITION IF NEEDED
    setTimeout(() => {
        let maxElements = totalElements;
        maxElements -= 3;

        if(transition){
            elements.forEach(el => {
                el.style.transition = 'transform .5s ease';
            });
            copiedNode.forEach(el => {
                el.style.transition = 'transform .5s ease';
            });
        }

        if(!transition) document.querySelector('.copy').style.transition = 'none';

        elements.forEach(el => {
            el.style.transform = `translateX(-${offset}px)`;
        });
        copiedNode.forEach(el => {
            el.style.transform = `translateX(-${offset}px)`;
        });
    });

    if(index === projects.length) setTimeout(() => rotateCarousel(direction), 500); // IF WE'RE AT THE END OF THE CAROUSEL, LOOP EVERYTHING
}

// PAUSE AND RESUME THE AUTOPLAY
document.getElementById('pauseResumeBtn').addEventListener('click', function() {
    if(isRotating){
        clearInterval(rotationTimer);
    }else{
        rotationTimer = setInterval(() => rotateCarousel('right'), rotationInterval);
    }

    isRotating = !isRotating;
    document.getElementById('pauseResumeBtn').classList.toggle('paused');
});


// CLONE FIRST AND LAST ELEMENTS TO HELP THE LOOP LOOK BETTER

const firstElement = elements[0].cloneNode(true);
const secondElement = elements[1].cloneNode(true);
const lasElement = elements[elements.length - 1].cloneNode(true);

firstElement.classList.add('copy');
secondElement.classList.add('copy');
lasElement.classList.add('copy');

carousel.insertBefore(firstElement, null);
carousel.insertBefore(secondElement, null);
carousel.insertBefore(lasElement, elements[0]);

// MAKE THE CAROUSEL BEGINS WITH THE FIRST ELEMENT
carousel.scrollLeft = -document.querySelector('.carousel-element').clientWidth;

// SETTING THE NEW TOTAL NUMBER OF ELEMENTS
totalElements = document.querySelectorAll('.carousel-element').length;


// IF WINDOW IS RESIZED, GET THE NEW GAP BETWEEN ELEMENTS
window.addEventListener('resize', () => {
    gapElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--element-gap').split('px')[0]);
});
