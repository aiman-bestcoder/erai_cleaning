const image = document.querySelector('.image-container img');
let lastScrollY = 0;
let currentScrollY = 0;
let animationFrame;

function smoothScrollEffect() {
  // Плавное изменение текущего положения скролла с минимальной задержкой
  currentScrollY += (lastScrollY - currentScrollY) * 0.08; // Меньше значение для более плавного эффекта

  // Нормализуем скролл (от 0 до 1)
  const progress = Math.min(currentScrollY / window.innerHeight, 1);

  // Ограничиваем уменьшение изображения до 95% от исходного размера
  const scale = Math.max(1 - progress * 0.2, 0.95); // Минимальный масштаб 0.95
  const translateY = progress * 20; // Плавный сдвиг вверх
  const borderRadius = Math.min(progress * 80, 80); // Ограничиваем максимальный радиус закругления

  // Применяем изменения (исправлены кавычки и интерполяция)
  image.style.transform = `scale(${scale}) translateY(-${translateY}%)`;
  image.style.borderRadius = `${borderRadius}px`;

  // Продолжаем анимацию
  animationFrame = requestAnimationFrame(smoothScrollEffect);
}

// Слушаем событие прокрутки
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  // Запускаем анимацию, если её ещё нет
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(smoothScrollEffect);
  }
});
