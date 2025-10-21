document.addEventListener("DOMContentLoaded", () => {
  // находим все иконки инфо
  const infoIcons = document.querySelectorAll(".service-info-icon");

  infoIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      // переключаем класс "expanded"
      icon.classList.toggle("expanded");

      // ищем вложенный блок с текстом
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

  // если используем service-included — можно плавно открывать/закрывать
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
  // мобильный/тач фоллбек: тап по чипу — переключает отображение тултипа
  document.querySelectorAll('.extra-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      // предотвращаем закрытие/открытие при клике по внутренним элементам
      e.stopPropagation();
      // закрываем другие
      document.querySelectorAll('.extra-chip.extra-open').forEach(c => {
        if (c !== chip) c.classList.remove('extra-open');
      });
      chip.classList.toggle('extra-open');
    });
  });

  // тап вне — закрыть все тултипы
  document.addEventListener('click', () => {
    document.querySelectorAll('.extra-chip.extra-open').forEach(c => c.classList.remove('extra-open'));
  });
});
