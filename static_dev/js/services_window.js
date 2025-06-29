document.querySelectorAll('.service-info-icon').forEach(icon => {
  const text = icon.querySelector('.service-info-text');

  icon.addEventListener('mouseenter', () => {
    // Показ текста и расширение иконки
    icon.classList.add('expanded');
    text.style.opacity = '1';
    text.style.transform = 'translateY(0)';
  });

  icon.addEventListener('mouseleave', () => {
    // Скрытие текста и уменьшение иконки
    text.style.opacity = '0';
    text.style.transform = 'translateY(10px)';

    // Через 300 мс убираем расширение
    setTimeout(() => {
      icon.classList.remove('expanded');
    }, 200);
  });
});

// Устанавливаем дату заказа сегодня
function setOrderDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  $('#orderDateValue').text(`${dd}.${mm}.${yyyy}`);
}

// Обновление цены через AJAX
function updatePrice() {
  const form = $('#order-form');
  $.get(form.attr('action').replace('order/', 'ajax/calculate/'), form.serialize(), function(data) {
      $('#priceValue').text(data.price.toFixed(2));
  });
}

$(document).ready(function() {
  setOrderDate();
  updatePrice();
  $('#order-form').on('change input', updatePrice);
});

