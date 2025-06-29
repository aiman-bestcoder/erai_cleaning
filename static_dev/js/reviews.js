let currentIndex = 0;

const container = document.querySelector('.reviews-container');
const cards = document.querySelectorAll('.review-card');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const title = document.querySelector('.reviews-title');  // Заголовок

// Функция для прокрутки карусели
function moveCarousel(direction) {
  const cardWidth = cards[0].offsetWidth + 20; // Ширина карточки с учетом отступа

  // Обновляем текущий индекс с учетом направления
  currentIndex += direction;

  // Блокируем кнопки, если достигнут предел
  if (currentIndex < 0) {
    currentIndex = 0; // Нельзя прокручивать влево за пределы
  } else if (currentIndex >= cards.length) {
    currentIndex = cards.length - 1; // Нельзя прокручивать вправо за пределы
  }

  // Прокрутка на одну карточку
  const targetPosition = currentIndex * cardWidth;

  // Применяем плавную прокрутку
  container.scrollTo({
    left: targetPosition,
    behavior: 'smooth' // Плавная прокрутка
  });

  // Прокручиваем к видимой карточке
  cards[currentIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center' // Центрируем карточку в пределах видимой области
  });

  // Блокировка кнопок в зависимости от положения
  toggleButtons();
}

// Функция для блокировки кнопок
function toggleButtons() {
  if (currentIndex === 0) {
    prevButton.disabled = true; // Блокируем кнопку влево
  } else {
    prevButton.disabled = false;
  }

  if (currentIndex === cards.length - 1) {
    nextButton.disabled = true; // Блокируем кнопку вправо
  } else {
    nextButton.disabled = false;
  }
}

// Функция для анимации появления карточек
function animateCards() {
  const options = {
    threshold: 0.1 // Элемент должен быть виден хотя бы на 10%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Анимируем карточку при первом появлении
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Останавливаем наблюдение для этой карточки
      }
    });

    // Анимируем заголовок, если хотя бы одна карточка видна
    if (!title.classList.contains('show')) {
      title.classList.add('show'); // Запуск анимации заголовка
    }
  }, options);

  cards.forEach(card => {
    observer.observe(card); // Наблюдаем за каждой карточкой
  });
}

// Функция для анимации заголовка
function animateTitle() {
  const options = {
    threshold: 0.05 // Элемент должен быть виден хотя бы на 5% в пределах экрана
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Добавляем класс для анимации
        observer.unobserve(entry.target); // Останавливаем наблюдение для этого элемента
      }
    });
  }, options);

  observer.observe(title); // Наблюдаем за заголовком
}

// Запуск анимации для карточек и заголовка
animateCards();
toggleButtons(); // Настроим кнопки
animateTitle();  // Анимация для заголовка

// Слушатели событий для кнопок прокрутки
prevButton.addEventListener('click', () => moveCarousel(-1));
nextButton.addEventListener('click', () => moveCarousel(1));

// Обновление стилей для первой и последней карточки
function updateCardMargins() {
  // Убираем все марджины
  cards.forEach(card => {
    card.style.marginLeft = '0';
    card.style.marginRight = '0';
  });

  // Добавляем марджины для первой и последней карточки
  if (cards.length > 0) {
    cards[0].style.marginLeft = '20px'; // Отступ для первой карточки
    cards[cards.length - 1].style.marginRight = '20px'; // Отступ для последней карточки
  }
}

// Обновляем отступы при изменении окна или инициализации
window.addEventListener('resize', updateCardMargins);
updateCardMargins(); // Инициализация при загрузке
