import * as flsFunctions from './function.js';

flsFunctions.isWebp()

let animItems = document.querySelectorAll("[data-scroll-anim]");

let scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;
document.documentElement.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);

if (animItems.length > 0) {
    window.addEventListener('scroll', scrollTrigger);

    function scrollTrigger() {
    if(window.scrollY < (window.innerHeight * 1.3)) document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);

    for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 100;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('scrollAnimActive');
            }else {
                animItem.classList.remove('scrollAnimActive');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(scrollTrigger(), 400)
}

let menuHeight = parseInt(getComputedStyle(document.querySelector('.navbar')).height); 
let navbar = document.querySelector('.navbar__inner');

function scrollToElem(e) {
    const goto = e.target.getAttribute('data-goto');
    let position = document.querySelector(goto).getBoundingClientRect().top + scrollY - menuHeight - 20;
    window.scrollTo({
        top: position,
        behavior: "smooth"
    });
}
navbar.addEventListener('click',scrollToElem);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.content',
	content: '.content__inner',
    effects: true
})

gsap.fromTo('.about__content .about__content__item:first-child', {opacity: 0, x:-80}, {
    opacity: 1,
    x: 0,
    scrollTrigger: {
        trigger: '.about__content',
        start: 'top bottom',
        end:'+=500',
        scrub: true
    }
})
gsap.fromTo('.about__content .about__content__item:last-child', {opacity: 0,x:80}, {
    opacity: 1,
    x: 0,
    scrollTrigger: {
        trigger: '.about__content',
        start: 'top bottom',
        end:'+=500',
        scrub: true
    }
})

document.documentElement.addEventListener('mousedown', (e) => {
    let posX = e.offsetX;
    let posY = e.offsetY;
    if(e.target.closest('.pulse')){
        e.target.style.setProperty('--x', posX + 'px');
        e.target.style.setProperty('--y', posY + 'px');     
        e.target.classList.add('pulseActive');
        e.target.addEventListener('animationend', () =>{
            e.target.classList.remove('pulseActive');
        })
    }
})

window.onload = ()=>{
    const obj = document.querySelector('.content__inner');
    const circle = document.querySelectorAll('.circle');

    const coefficientOne = 6;
    const coefficientTwo = 2;

    const speed = 1;

    let positionX = 0;
    let positionY = 0;
    let coordinateXproc = 0;
    let coordinateYproc = 0;

    function parallaxMouse() {
        const distX = coordinateXproc - positionX;
        const distY = coordinateYproc - positionY;
        positionX += distX * speed;
        positionY += distY * speed;

        let propertyOne = `${positionX / coefficientOne}%,${positionY / coefficientOne}%`;
        let propertyTwo = `${positionX / coefficientTwo}%,${positionY / coefficientTwo}%`;

        for (let index = 0; index < circle.length; index++) {
            if(circle[index].classList.contains('circle-type-1')){
                circle[index].style.setProperty('--coordinate', propertyOne);
            }else{
                circle[index].style.setProperty('--coordinate', propertyTwo);
            }            
        }
        requestAnimationFrame(parallaxMouse);
    }
    parallaxMouse();

    obj.addEventListener('mousemove',(e)=>{
        if(e.target.closest('.about') || e.target.closest('.the-school')){
        let blockWidth = obj.offsetWidth;
        let blockHeight = obj.offsetHeight;
        let coordX = e.pageX - blockWidth / 2;
        let coordY = e.clientY - blockHeight / 2;
        coordinateXproc = coordX / blockWidth * 100;
        coordinateYproc = coordY / blockHeight * 100;
        }
    })
}

let video = document.querySelectorAll(".video-box");
let clipFirst = document.querySelector(".options__block:first-child video");
let clipSecond = document.querySelector(".options__block:last-child video");

clipFirst.addEventListener("mouseover", function (e) {
    clipFirst.play();
})
clipFirst.addEventListener("mouseout", function (e) {
    clipFirst.pause();
})
clipSecond.addEventListener("mouseover", function (e) {
    clipSecond.play();
})
clipSecond.addEventListener("mouseout", function (e) {
    clipSecond.pause();
})

video.forEach(element => {
    gsap.fromTo(element, {opacity: 0, x: 80}, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
            trigger: '.options',
            start: 'top bottom',
            end:'bottom bottom',
            scrub: true
        }
    })
});

const inputBox = document.querySelector('.input-box');
const input = document.querySelectorAll('.input input');

inputBox.addEventListener('input',(e)=>{
    if (e.target.closest('input')) {
        validate();
    }
});
function validate() {
    input.forEach(element =>{
        if(element.value.length){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    })
}

const checkmark = document.querySelector('.remember');

checkmark.addEventListener('click',()=>{
    checkmark.classList.toggle('deactive');
})

const shadowBox = document.querySelector('.shadow-box');
const loginButton = document.querySelector('.navbar__inner__button');

loginButton.addEventListener('click',()=>{
    validate();
    shadowBox.style.top = `${window.scrollY}px`;
    inputBox.classList.toggle('active');
})

shadowBox.addEventListener('click',(e)=>{
    if(!e.target.closest('.input-box')) inputBox.classList.remove('active');
})