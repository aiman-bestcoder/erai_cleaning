document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.cleaning-area');
  
    const options = {
      threshold: 0.2, // 20% секции должно быть видно
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Остановить наблюдение
        }
      });
    }, options);
  
    observer.observe(section);
  });
  