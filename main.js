'use strict';

// Navbar 투명화
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar__dark');
  } else {
    navbar.classList.remove('navbar__dark');
  }
});

// Navbar 메뉴 클릭시 스크롤 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// navbar 토글 버튼
const toggleBtn = document.querySelector('.navbar__toggle__button');

toggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// home__ contact me! button 클릭시 스크롤 이동
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', event => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// 스크롤시 HOME content 투명화

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 이래로 스크롤시 arrow top button 활성화
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// arrow top button 클릭시 페이지 맨 위로 이동.
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// projects 클릭시 필터링 및 애니메이션 추가
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', event => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }

  const selected = document.querySelector('.category__btn.selected');
  selected.classList.remove('selected');
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach(project => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// 스크롤시 해당 Menu item들 색 표시.
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));

const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// 스크롤 이동
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

window.addEventListener('wheel', () => {
  // 스크롤이 제일 위에 이동시
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  }
  // 제일 밑으로 스크롤 이동시
  else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

//  프로젝트 모달
const project = document.querySelectorAll('.project');
[].forEach.call(project, function (project) {
  project.addEventListener('click', handleOnModal);
});

function handleOnModal(event) {
  const contentId = event.currentTarget.dataset.id;
  if (contentId) {
    document.querySelectorAll('.project__modal')[contentId].style.display = 'block';
  }
  return;
}

const cancel = document.querySelectorAll('.modal__cancel');
[].forEach.call(cancel, function (cancel) {
  cancel.addEventListener('click', handleOffModal);
});

function handleOffModal(event) {
  event.currentTarget.closest('article').style.display = 'none';
  // document.querySelector('.project__modal').style.display = 'none';
}
