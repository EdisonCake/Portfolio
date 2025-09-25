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
    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if ((el.tagName === 'A' || el.tagName === 'BUTTON') && el.children.length > 0) {
                 const childNodes = Array.from(el.childNodes);
                 const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                 if (textNode) {
                    textNode.textContent = text;
                 }
            } else {
                 el.innerHTML = text;
            }
        }
    });

     const btnPt = document.querySelector('a[href*="ptbr"] button');
     const btnEn = document.querySelector('a[href*="en"] button');
     if(lang === 'pt') {
        btnPt.textContent = "📄 Currículo (pt-BR)";
        btnEn.textContent = "📄 Currículo (EN)";
     } else {
        btnPt.textContent = "📄 Resume (pt-BR)";
        btnEn.textContent = "📄 Resume (EN)";
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

    // ===== LÓGICA DO MENU HAMBURGER ATUALIZADA =====
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.menu');
    const navLinks = document.querySelectorAll('.menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Adiciona/remove a classe que bloqueia a rolagem do corpo da página
        document.body.classList.toggle('noscroll');
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            // Sempre remove a classe de bloqueio ao fechar o menu
            document.body.classList.remove('noscroll');
        });
    });
});