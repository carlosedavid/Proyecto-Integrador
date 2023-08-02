const form = document.getElementById('formulario2');
const submitButton = document.getElementById('submit-button2');

form.addEventListener('input', () => {
    const requiredFields = form.querySelectorAll('input[required]');
    const filledRequiredFields = Array.from(requiredFields).every(field => field.value !== '');
    if (filledRequiredFields) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

window.onload = function() {
    document.title = "Contacto - Carlos Eduardo David Laroche - Proyecto Integrador: Juguetería Cósmica";
}

