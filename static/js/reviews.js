document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".reviews-container");
  const cards = document.querySelectorAll(".review-card");
  const title = document.querySelector(".reviews-title");
  const bg = document.querySelector(".reviews-background");

  if (!container || !bg) return;

  bg.style.transition = "transform 0.2s ease-out";

  function updateBg() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom > 0 && rect.top < windowHeight) {

      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      const maxOffset = 250;
      bg.style.transform = `translateY(${progress * maxOffset}px)`;
    }
  }

  window.addEventListener("scroll", updateBg);
  window.addEventListener("resize", updateBg);
  updateBg();

  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => cardObserver.observe(card));

  const titleObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      title.classList.add("show");
      titleObserver.unobserve(entry.target);
    }
  }, { threshold: 0.05 });
  titleObserver.observe(title);

  function updateCardMargins() {
    cards.forEach(card => { card.style.marginLeft = "0"; card.style.marginRight = "0"; });
    if (cards.length) {
      cards[0].style.marginLeft = "20px";
      cards[cards.length-1].style.marginRight = "20px";
    }
  }
  window.addEventListener("resize", updateCardMargins);
  updateCardMargins();
});
