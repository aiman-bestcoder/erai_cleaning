document.querySelectorAll(".order-option").forEach((option) => {
    option.addEventListener("click", () => {
      const group = option.parentElement;
      group.querySelectorAll(".order-option").forEach((el) => {
        el.classList.remove("selected");
      });
      option.classList.add("selected");
      const inputId = group.id.replace("-options", "");
      const hiddenInput = document.getElementById(inputId);
      if (hiddenInput) {
        hiddenInput.value = option.dataset.value;
      }
    });
  });

  $(document).ready(function () {
    $(".custom-dropdown .selected").click(function () {
      const $options = $(this).siblings(".options");
      $(".custom-dropdown .options").not($options).hide();
      $options.toggle();
    });
  
    $(".custom-dropdown .options li").click(function () {
      const $this = $(this);
      const value = $this.data("value");
      const label = $this.text();
      const $dropdown = $this.closest(".custom-dropdown");
  
      $dropdown.children(".selected").text(label);
      $dropdown.find("select").val(value);
      $dropdown.find(".options").hide();
  
      $dropdown.find(".options li").removeClass("selected");
      $this.addClass("selected");
  
      updatePrice();
    });
  
    $(document).click(function (e) {
      if (!$(e.target).closest(".custom-dropdown").length) {
        $(".custom-dropdown .options").hide();
      }
    });
  });



  