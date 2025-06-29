document.addEventListener("DOMContentLoaded", () => {
    const heroBox = document.getElementById("hero-box");
    setTimeout(() => {
      heroBox.classList.add("glow");
    }, 2500);
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          entry.target.querySelectorAll(".fade-in-on-scroll").forEach(el => {
            el.classList.add("visible");
          });
        }
      });
    }, {
      threshold: 0.4
    });
  
    document.querySelectorAll(".section").forEach(section => {
      observer.observe(section);
    });
  });
  