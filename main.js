'use strict'

// Make navbar transparent when it is on the top .1
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu .2
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);   //반복최소화
});

// Handle click on "contact me" button on home .2
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');     //반복최소화
});

// Make home slowly fade to transparent as the window scolls down .3
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = (1- window.scrollY / homeHeight);
});

// Show "arrow up" button when scrolling
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// "arrow up" 버튼을 클릭했을 때
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null){
        return;
    }

    projectContainer.classList.add('anim-out');
    
    // 0.3초뒤 아래 코드를 실행시켜줌
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        // 이 코드와 동일한 기능
        // let project;
        // for(let i=0; i<projects.length; i++){
        //     project = projects[i];
        // }
        projectContainer.classList.remove('anim-out');
    }, 300);

});


function scrollIntoView(selector) {     // 반복코드 최소화
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}



/* 
Summary
1.
유틸리티 함수는 맨밑으로 내리는게 좋음 ex) function함수
querySelector() 할때는 형태에 맞게 # = (id), . = (class) 주의  
    ex) id=navbar 를 찾을 땐 querySelector('#navbar'); 
    navbar.classList.add('navbar--dark'); > 선언된 navbar의 클래스를 'navbar--dark' 로 지정
    navbar.classList.remove('navbar--dark'); > 클래스 삭제

* window.scrollY > 아래로 스크롤 몇픽셀 했는지 eventListener의 scroll에서 사용
* navbar.getBoundingClientRect().height; > navbar의 height값을 가져옴

2.
???.addEventListener('click', (event) => {
    code~~
});
    > 선언된 ???에 click이라는 이벤트가 발생했을 경우 code~~를 실행함
    > event.target > click된 요소 출력 ex)홈버튼 클릭시 <li class="navbar__menu__item">Home</li>
    > target.dataset.link > target이라는 변수에 정의된 요소의 data-link가 뜸 ex)data-link="#home" 일경우 출력값: #home
function 으로 호출하면 실행되는 scrollIntoView() 만들어서 반복되는 요소 제거 > 코드 간결화

3.
home.style.opacity > 선언된 home의 style에서 opacity(=투명도)를 조정
(1 - window.scrollY / homeHeight) > 투명도를 쓰기위한 공식
    ex) 시작지점 = (1 - 0/800 = 1)
        중간지점 = (1 - 400/800 = 0.5)
        끝지점 = (1 - 800/800 = 0)
*/