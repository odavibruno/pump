// 0. CONFIGURAÇÃO SMOOTH SCROLL (LENIS TUNADO)
const lenis = new Lenis({ 
    duration: 2.3, 
    lerp: 0.05,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000) });
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

// --- ANIMAÇÃO SPLIT TEXT HERO ---

const heroTitle = document.getElementById('hero-title');
const text = heroTitle.textContent;
const characters = text.split("");



// 1. TRANSIÇÃO HERO: O Granulado se desfaz e expande
gsap.to('.hero-bg, .hero-overlay', {
    opacity: 0,
    scale: 1.2,
    filter: "blur(15px)",
    scrollTrigger: {
        trigger: '.impact',
        start: "top bottom", 
        end: "top 20%", 
        scrub: true
    }
});

gsap.to('.hero-content', {
    y: -150,
    opacity: 0,
    scrollTrigger: {
        trigger: '.impact',
        start: "top bottom",
        end: "top 60%",
        scrub: true
    }
});

// PREPARAÇÃO PARA A SEÇÃO 2: Separar as palavras em Spans
const impactElement = document.getElementById('impact-text');
const words = impactElement.innerText.split(' ');
impactElement.innerHTML = '';
words.forEach(word => {
    const span = document.createElement('span');
    span.innerText = word + ' ';
    impactElement.appendChild(span);
});

// 2. SEÇÃO DE IMPACTO: Pinada, palavras surgem e encolhem
const spans = document.querySelectorAll('.impact-phrase span');
gsap.to(spans, {
    opacity: 1,
    scale: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.impact',
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1
    }
});

// 3. SEÇÃO PORTFOLIO: Scroll Horizontal
const projectsWrapper = document.querySelector('.projects-wrapper');
// Atrasar o cálculo da largura para garantir que as fontes/imagens carregaram
window.addEventListener('load', () => {
    let scrollAmount = projectsWrapper.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
    
    gsap.to(projectsWrapper, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: '.portfolio',
            start: "top top",
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
});

// 4. TRANSIÇÃO PARA SOBRE: Fade in
gsap.from('.about', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '.about',
        start: "top 70%"
    }
});

// 5. FOOTER: Revelação da Logo Gigante
gsap.fromTo('.footer-logo', 
    { y: "100%" },
    {
        y: "20%",
        scrollTrigger: {
            trigger: '.footer',
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5
        }
    }
);