// MENU MOBILE TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('ativo');
});

document.addEventListener('DOMContentLoaded', function() {
    const accordionCards = document.querySelectorAll('.accordion-card');
    
    accordionCards.forEach(card => {
        const header = card.querySelector('.card-header');
        
        header.addEventListener('click', function() {
            card.classList.toggle('active');
        });
    });

    const formSections = document.querySelectorAll('.form-section');
    
    formSections.forEach((section, index) => {
    
        if (index !== 0) {
            section.classList.add('collapsed');
        }

        const header = section.querySelector('.form-section-header');
        
        header.addEventListener('click', function() {
            section.classList.toggle('collapsed');
        });
    });
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('ativo');
    });
});

const formReserva = document.getElementById('formReserva');

formReserva.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const pessoas = document.getElementById('pessoas').value;
    const criancas = document.getElementById('criancas').value || '0';
    const mensagem = document.getElementById('mensagem').value;


    if (!nome || !telefone || !email || !data || !hora || !pessoas) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!telefoneRegex.test(telefone) || telefone.length < 10) {
        alert('Por favor, insira um telefone válido!');
        return;
    }

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    const numeroWhatsApp = '5511999999999'; // Substitua pelo número real do restaurante
    const mensagemWhatsApp = encodeURIComponent(
        `*Reserva - Porteira Picanharia*\n\n` +
        `Nome: ${nome}\n` +
        `Telefone: ${telefone}\n` +
        `Email: ${email}\n` +
        `Data: ${dataFormatada}\n` +
        `Hora: ${hora}\n` +
        `Número de Pessoas: ${pessoas}\n` +
        `Crianças: ${criancas}\n` +
        `Mensagem: ${mensagem || 'Sem mensagem adicional'}`
    );

    const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`;

    alert('Reserva enviada com sucesso! Você será redirecionado para o WhatsApp.');

    window.open(whatsappUrl, '_blank');

    formReserva.reset();
});

let ultimoScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollAtual = window.scrollY;
    
    if (scrollAtual <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }
    
    ultimoScroll = scrollAtual;
});

function animarContador(elementoId, alvo, duracao = 2000) {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;

    let inicio = 0;
    const incremento = alvo / (duracao / 50);

    const intervalo = setInterval(() => {
        inicio += incremento;
        if (inicio >= alvo) {
            elemento.textContent = alvo;
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(inicio);
        }
    }, 50);
}

window.addEventListener('load', function() {
    console.log('Site Porteira Picanharia carregado com sucesso!');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targePosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targePosition,
                behavior: 'smooth'
            });
        }
    });
});

const inputTelefone = document.getElementById('telefone');
if (inputTelefone) {
    inputTelefone.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d\s\-\(\)]/g, '');
    });
}

const inputEmail = document.getElementById('email');
if (inputEmail) {
    inputEmail.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#FF6B35';
            console.warn('Email inválido');
        } else {
            this.style.borderColor = '#ddd';
        }
    });
}

const inputData = document.getElementById('data');
if (inputData) {
    inputData.addEventListener('change', function() {
        const dataEscolhida = new Date(this.value);
        const hoje = new Date();
        
        if (dataEscolhida < hoje) {
            alert('Por favor, escolha uma data futura!');
            this.value = '';
        }
    });
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c=== PORTEIRA PICANHARIA ===', 'color: #8B4513; font-size: 16px; font-weight: bold;');
    console.log('%cPara completar o site, você precisa:', 'color: #333; font-size: 12px;');
    console.log('%c1. Adicionar fotos reais do restaurante nas seções "Sobre" e "Galeria"', 'color: #666; font-size: 12px;');
    console.log('%c2. Atualizar o número do WhatsApp no botão flutuante e no formulário', 'color: #666; font-size: 12px;');
    console.log('%c3. Customizar endereço, telefone e horários na seção "Contato"', 'color: #666; font-size: 12px;');
    console.log('%c4. Ajustar cores se necessário (encontradas em :root no CSS)', 'color: #666; font-size: 12px;');
});
