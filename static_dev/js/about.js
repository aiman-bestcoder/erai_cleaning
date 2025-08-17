const sloganSection = document.querySelector('.slogan-section');
const sloganBg = document.querySelector('.slogan-bg');

window.addEventListener('scroll', () => {
  const rect = sloganSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    // Смещаем фон пропорционально положению секции на экране
    const offset = (windowHeight - rect.top) * 0.14; // настрой скорость тут
    sloganBg.style.transform = `translateY(${offset}px)`;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const track   = document.querySelector(".intro-carousel-track");
  const slides  = Array.from(document.querySelectorAll(".intro-carousel-slide:not(.intro-ghost-slide)"));
  const prevBtn = document.querySelector(".intro-carousel-nav.prev");
  const nextBtn = document.querySelector(".intro-carousel-nav.next");
  let index = 0;

  // Отмечаем первый слайд активным (без скролла)
  slides.forEach((s, i) => s.classList.toggle("active", i === 0));
  updateActiveByIndex(0);

  function updateActiveByIndex(newIndex) {
    index = newIndex;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    const active = slides[index];
    const offset = track.clientWidth/2 - active.offsetWidth/2;
    track.scrollTo({ left: active.offsetLeft - offset, behavior: "smooth" });
  }

  // Обработка колёсика/таска
  let to;
  track.addEventListener("scroll", () => {
    clearTimeout(to);
    to = setTimeout(() => {
      const center = track.getBoundingClientRect().left + track.clientWidth/2;
      let best = 0, minD = Infinity;
      slides.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        const c = r.left + r.width/2;
        const d = Math.abs(c - center);
        if (d < minD) { minD = d; best = i; }
      });
      updateActiveByIndex(best);
    }, 100);
  });

  // Кнопки
  prevBtn.addEventListener("click", () =>
    updateActiveByIndex((index - 1 + slides.length) % slides.length)
  );
  nextBtn.addEventListener("click", () =>
    updateActiveByIndex((index + 1) % slides.length)
  );

  // Свайпы
  let startX = 0;
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      updateActiveByIndex(dx < 0
        ? (index + 1) % slides.length
        : (index - 1 + slides.length) % slides.length
      );
    }
  });
});

