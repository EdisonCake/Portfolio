const sections = ['home', 'habilidades', 'projetos', 'contato', 'pessoal'];

function showSection(sectionId) {
    sections.forEach(id => {
        const sec = document.getElementById(id);
        if (!sec) return;

        if (id === sectionId) {
            sec.style.display = 'block';
            void sec.offsetWidth;
            sec.classList.add('active');
        } else {
            sec.style.display = 'none';
            sec.classList.remove('active');
        }
    });
}

function setLanguage(lang) {
    // 1. Traduz todos os elementos genéricos
    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.innerHTML = text;
        }
    });

    // 2. Lógica específica e à prova de falhas para os botões de currículo usando IDs
    const btnResumePT = document.getElementById('btn-resume-pt');
    const btnResumeEN = document.getElementById('btn-resume-en');

    // Verifica se os botões existem antes de tentar alterá-los
    if (btnResumePT && btnResumeEN) {
        if (lang === 'pt') {
            btnResumePT.innerHTML = "📄 Currículo (pt-BR)";
            btnResumeEN.innerHTML = "📄 Currículo (EN)";
        } else { // lang === 'en'
            btnResumePT.innerHTML = "📄 Resume (pt-BR)";
            btnResumeEN.innerHTML = "📄 Resume (EN)";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('home');

    // Lógica de tradução
    const selector = document.getElementById('languageSelector');
    selector.addEventListener('change', e => setLanguage(e.target.value));
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('en')) {
        selector.value = 'en';
        setLanguage('en');
    } else {
        selector.value = 'pt';
        setLanguage('pt');
    }

    // Lógica da troca de imagem
    const personalCards = document.querySelectorAll('.card-pessoal');
    personalCards.forEach(card => {
        const hoverImage = card.getAttribute('data-hover-image');
        if (hoverImage) {
            card.style.setProperty('--hover-image', hoverImage);
        }
    });

    // Lógica do Menu Hamburger
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.menu');
    const navLinks = document.querySelectorAll('.menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('noscroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('noscroll');
        });
    });

    // Lógica de toque nos cards pessoais (Mobile)
    personalCards.forEach(clickedCard => {
        clickedCard.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                personalCards.forEach(otherCard => {
                    if (otherCard !== clickedCard) {
                        otherCard.classList.remove('is-active-mobile');
                    }
                });
                clickedCard.classList.toggle('is-active-mobile');
            }
        });
    });
});