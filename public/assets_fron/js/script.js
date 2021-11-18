// TOOGLE MENU
const toggle__menu = document.querySelector('.toggle__menu');

const nav__link = document.querySelector('.nav_link');

const toggle_menu = ()=>{
    nav__link.classList.toggle('toggle-menu');
}
toggle__menu.addEventListener('click', toggle_menu);

// ACCORDION

    const acc = document.querySelectorAll('a[data-toggle="collapse"]');
    
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function(){
            this.querySelector('.panah').classList.toggle('rotatePanah');
        })
      
    }
