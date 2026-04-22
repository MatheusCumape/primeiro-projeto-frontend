// Cursor blink animation is handled by CSS.
// This script adds a small typing effect on page load.

document.addEventListener('DOMContentLoaded', function () {
    const subtitulo = document.querySelector('.subtitulo');
    if (!subtitulo) return;

    const textoCompleto = subtitulo.textContent.trim();
    subtitulo.textContent = '';

    let i = 0;
    const velocidade = 60; // ms por caractere

    function digitar() {
        if (i < textoCompleto.length) {
            subtitulo.textContent += textoCompleto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        }
    }

    // Pequena pausa antes de começar a digitar
    setTimeout(digitar, 400);
});
