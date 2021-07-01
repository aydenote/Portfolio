'use strict'


// Navbar 투명화
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar__dark');
    } else {
        navbar.classList.remove('navbar__dark');
    }
});

// Navbar 메뉴 클릭시 스크롤 이동
const navbarMenu= document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const link = event.target.dataset.link;
    if(link == null){
        return
    } 
    scrollIntoView(link);
});

// home__ contact me! button 클릭시 스크롤 이동
const contactMe= document.querySelector('.home__contact');
contactMe.addEventListener('click', (event)=>{
    const link = event.target.dataset.link;
     if(link== null){
        return
    } 
    
    scrollIntoView(link);
});

// 스크롤 이동 
function scrollIntoView(selector){
    const scrollTo= document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
};

// 스크롤시 HOME content 투명화

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
  home.style.opacity= 1 - window.scrollY / homeHeight;
});

// 이래로 스크롤시 arrow top button 활성화
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight /2 ){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

// arrow top button 클릭시 페이지 맨 위로 이동.
arrowUp.addEventListener('click', ()=>{
    scrollIntoView('#home');
});



