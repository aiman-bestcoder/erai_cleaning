document.querySelector('.header').addEventListener('mouseover', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.opacity = 1; // Ставим opacity на 1 при наведении
    navLinks.style.transition = 'opacity 0.5s ease'; // Плавная анимация
});

document.querySelector('.header').addEventListener('mouseleave', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.opacity = 0; // Ставим opacity на 0 при уходе курсора
    navLinks.style.transition = 'opacity 0.3s ease'; // Плавная анимация
});
