
  // Открытие модального окна
  function openModal() {
    document.getElementById("reviewModal").style.display = "block";
  }

  // Закрытие модального окна
  function closeModal() {
    document.getElementById("reviewModal").style.display = "none";
  }

  // Закрытие окна при клике вне его
  window.onclick = function (event) {
    const modal = document.getElementById("reviewModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
