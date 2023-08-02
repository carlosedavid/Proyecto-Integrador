window.onload = function() {
    document.title = "Alta - Carlos Eduardo David Laroche - Proyecto Integrador: Juguetería Cósmica";
}

const form = document.getElementById('formulario');
const submitButton = document.getElementById('submit-button');
const ageUnitSelect = document.getElementById('age-from-unit');


form.addEventListener('input', () => {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    const filledRequiredFields = Array.from(requiredFields).every(field => field.value !== '');

    if (filledRequiredFields) {
    submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }

    const ageFrom = parseFloat(document.getElementById('age-from').value);
    const ageTo = parseFloat(document.getElementById('age-to').value);
    const ageUnit = ageUnitSelect.value;
    const ageFromDisplay = ageFrom + (ageUnit === 'months' ? ' meses' : ' años');
    const ageToDisplay = ageTo + (ageUnit === 'months' ? ' meses' : ' años');
    document.getElementById('age-from-display').textContent = ageFromDisplay;
    document.getElementById('age-to-display').textContent = ageToDisplay;
});

ageUnitSelect.addEventListener('change', () => {
    const ageFrom = parseFloat(document.getElementById('age-from').value);
    const ageTo = parseFloat(document.getElementById('age-to').value);
    const ageUnit = ageUnitSelect.value;
    const ageFromDisplay = ageFrom + (ageUnit === 'months' ? ' meses' : ' años');
    const ageToDisplay = ageTo + (ageUnit === 'months' ? ' meses' : ' años');
    document.getElementById('age-from-display').textContent = ageFromDisplay;
    document.getElementById('age-to-display').textContent = ageToDisplay;
});


