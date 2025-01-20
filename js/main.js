const select = document.querySelectorAll(".hero__option");

select.forEach((selectOption) => {
  const dropdown = selectOption.querySelector(".hero__dropdown");
  const svgIcon = selectOption.querySelector(".svg-icon");

  selectOption.addEventListener("click", function (event) {
    // Якщо це не поточний елемент, то скидаємо "active" в інших елементах
    select.forEach((otherSelectOption) => {
      if (otherSelectOption !== selectOption) {
        otherSelectOption.querySelector(".hero__dropdown").classList.remove("active");
        otherSelectOption.querySelector(".svg-icon").classList.remove("active");
      }
    });

    // Перемикаємо клас "active" для поточного елемента
    dropdown.classList.toggle("active");
    svgIcon.classList.toggle("active");
  });
});

// Додаємо подію для закриття при кліку поза елементами
document.addEventListener("click", function (event) {
  if (!event.target.closest(".hero__option")) {
    select.forEach((selectOption) => {
      selectOption.querySelector(".hero__dropdown").classList.remove("active");
      selectOption.querySelector(".svg-icon").classList.remove("active");
    });
  }
});

const currencyInput = document.getElementById("currencyInput");

currencyInput.addEventListener("input", function () {
  let value = currencyInput.value;
  value = value.replace(/[^0-9.]/g, "");
  if (!value.includes(".")) {
    value = value + ".00";
  } else {
    const parts = value.split(".");
    parts[1] = parts[1].slice(0, 2);
    value = parts.join(".");
  }
  const cursorPosition = currencyInput.selectionStart;
  currencyInput.value = value;
  if (cursorPosition !== value.length) {
    currencyInput.setSelectionRange(cursorPosition, cursorPosition);
  }
});
