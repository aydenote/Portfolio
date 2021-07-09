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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// navbar 토글 버튼 
const toggleBtn = document.querySelector('.navbar__toggle_button');

toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
})

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


// projects 클릭시 필터링 및 애니메이션 추가
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event)=>{
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;

    if(filter == null){
        return;
    }

    const selected = document.querySelector('.category__btn.selected');
     selected.classList.remove('selected');
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    

    setTimeout(()=>{
        projects.forEach((project)=>{
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            } else{
                project.classList.add('invisible');
            }
        })
        projectContainer.classList.remove('anim-out');},300);
    
})


