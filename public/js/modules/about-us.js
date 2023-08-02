const accordionContainer = document.querySelector('.accordion');

accordionContainer.addEventListener('click', ev => {
    const target = ev.target;
    if (target.classList.contains('accordion-title') || target.parentElement.classList.contains('accordion-title')) {
        const title = target.classList.contains('accordion-title') ? target : target.parentElement;
        title.classList.toggle('accordion-title--open');
        title.nextElementSibling.classList.toggle('accordion-content--open');
        title.querySelector('.accordion-arrow').classList.toggle('accordion-arrow--open');
    }
});

const subscribeForm = document.getElementById('subscribe-form');

subscribeForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const emailInput = document.getElementById('email-input');
    console.log('Email:', emailInput.value);
});



window.onload = function() {
    document.title = "Nosotros - Carlos Eduardo David Laroche - Proyecto Integrador: Juguetería Cósmica";
}









