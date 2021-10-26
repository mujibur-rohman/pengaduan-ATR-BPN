// TOOGLE MENU
const toggle__menu = document.querySelector('.toggle__menu');

const nav__link = document.querySelector('.nav_link');

const toggle_menu = ()=>{
    nav__link.classList.toggle('toggle-menu');
}
toggle__menu.addEventListener('click', toggle_menu);

// ACCORDION
let acc = document.getElementsByClassName('faq-accordion-items');

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function(){
        this.classList.toggle('active');
        this.classList.toggle('acc-active');
        let panel = this.nextElementSibling;
        let panelP = panel.querySelector('p');
        if (panelP.style.maxHeight) {
            panelP.style.maxHeight = null;
        } else {
            panelP.style.maxHeight = panelP.scrollHeight + 'px';
        }
        
    });
    
}

