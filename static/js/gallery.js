document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-nav.prev");
  const nextBtn = document.querySelector(".carousel-nav.next");

  const allSlides = Array.from(track.querySelectorAll(".carousel-slide"));
  const slides = allSlides.filter(s => !s.classList.contains("ghost-slide"));

  if (!track || slides.length === 0) return;

  // Клон последнего слайда с прозрачностью
  const lastClone = slides[slides.length - 1].cloneNode(true);
  lastClone.style.opacity = "0";
  lastClone.style.pointerEvents = "none";
  lastClone.style.userSelect = "none";
  track.appendChild(lastClone);

  let index = 0;

  function updateEdgePadding() {
    const firstReal = slides[0];
    const lastReal = slides[slides.length - 1];
    const padLeft = Math.max(0, (track.clientWidth - firstReal.clientWidth) / 2);
    const padRight = Math.max(0, (track.clientWidth - lastReal.clientWidth) / 2);
    track.style.paddingLeft = `${padLeft}px`;
    track.style.paddingRight = `${padRight}px`;
  }

  function setActive(i) {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  }

  function goToSlide(i, smooth = true) {
    if (i < 0) i = 0;
    if (i >= slides.length) i = slides.length - 1;
    const slide = slides[i];
    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: smooth ? "smooth" : "auto" });
    setActive(i);
    index = i;
  }

  updateEdgePadding();
  setTimeout(() => goToSlide(0, false), 50);

  prevBtn.addEventListener("click", () => {
    goToSlide(index - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(index + 1);
    resetAutoplay();
  });

  track.addEventListener("scroll", () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, minD = Infinity;
    slides.forEach((slide, i) => {
      const c = slide.offsetLeft + slide.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < minD) { minD = d; best = i; }
    });
    if (best !== index) {
      index = best;
      setActive(best);
    }

    // Остановка автопрокрутки при скролле
    stopAutoplay();
    resetScrollTimer();
  });

  let autoplayInterval = null;
  let scrollStopTimer = null;
  const AUTOPLAY_DELAY = 4000;
  const SCROLL_RESTART_DELAY = 10000; // 10 секунд

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      if (index < slides.length - 1) {
        goToSlide(index + 1);
      } else {
        stopAutoplay();
      }
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function resetScrollTimer() {
    if (scrollStopTimer) clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      startAutoplay();
    }, SCROLL_RESTART_DELAY);
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateEdgePadding();
      goToSlide(index, false);
    }, 120);
  });

  startAutoplay();
});
