$(document).ready(function () {
  $(".custom-dropdown .selected").click(function () {
    const $options = $(this).siblings(".options");
    $(".custom-dropdown .options").not($options).removeClass("show");
    $options.toggleClass("show");
  });

  $(".custom-dropdown .options li").click(function () {
    const $this = $(this);
    const value = $this.data("value");
    const label = $this.text();
    const $dropdown = $this.closest(".custom-dropdown");

    $dropdown.children(".selected").text(label);
    $dropdown.find("select").val(value);
    $dropdown.find(".options").removeClass("show");

    $dropdown.find(".options li").removeClass("selected");
    $this.addClass("selected");

    updatePrice();
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".custom-dropdown").length) {
      $(".custom-dropdown .options").removeClass("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(orderCreateUrl, {
      method: "POST",
      headers: {
        "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          form.reset();
        } else {
          alert("Please correct the errors in the form.");
          console.log(data.errors);
        }
      })
      .catch(err => {
        alert("Server error");
        console.error(err);
      });
  });
});