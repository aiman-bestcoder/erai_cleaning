const image = document.querySelector('.image-container img');
let lastScrollY = 0;
let currentScrollY = 0;
let animationFrame;

function smoothScrollEffect() {
  currentScrollY += (lastScrollY - currentScrollY) * 0.08;

  const progress = Math.min(currentScrollY / window.innerHeight, 1);

  const scale = Math.max(1 - progress * 0.2, 0.95);
  const translateY = progress * 20;
  const borderRadius = Math.min(progress * 80, 80);

  image.style.transform = `scale(${scale}) translateY(-${translateY}%)`;
  image.style.borderRadius = `${borderRadius}px`;

  animationFrame = requestAnimationFrame(smoothScrollEffect);
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(smoothScrollEffect);
  }
});
