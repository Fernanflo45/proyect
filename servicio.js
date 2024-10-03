var buttons = document.querySelectorAll('.product button');
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        alert('¡Gracias por solicitar el servicio!');
    });
});