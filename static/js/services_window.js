document.addEventListener("DOMContentLoaded", () => {
  const infoIcons = document.querySelectorAll(".service-info-icon");

  infoIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("expanded");

      const infoText = icon.querySelector(".service-info-text");
      if (infoText) {
        if (icon.classList.contains("expanded")) {
          infoText.style.display = "block";
          setTimeout(() => {
            infoText.style.opacity = "1";
            infoText.style.transform = "translateY(0)";
          }, 50);
        } else {
          infoText.style.opacity = "0";
          infoText.style.transform = "translateY(10px)";
          setTimeout(() => {
            infoText.style.display = "none";
          }, 300);
        }
      }
    });
  });

  const toggles = document.querySelectorAll(".service-toggle");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const included = btn.closest(".service-block").querySelector(".service-included");
      if (!included) return;

      if (included.hasAttribute("hidden")) {
        included.removeAttribute("hidden");
        included.style.maxHeight = included.scrollHeight + "px";
      } else {
        included.style.maxHeight = "0";
        setTimeout(() => included.setAttribute("hidden", ""), 300);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.extra-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {

      e.stopPropagation();

      document.querySelectorAll('.extra-chip.extra-open').forEach(c => {
        if (c !== chip) c.classList.remove('extra-open');
      });
      chip.classList.toggle('extra-open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.extra-chip.extra-open').forEach(c => c.classList.remove('extra-open'));
  });
});
