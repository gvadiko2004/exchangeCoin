// Общие переменные
const curencyPrice = document.querySelector(".curency-price");
const cryptoList = document.getElementById("crypto-list");
const currencyInputPut = document.querySelector(".currency-input-put");
const currencyInputSell = document.querySelector(".currency-input-sell");
const selectPuts = document.querySelector(".hero__select-puts");
const heroIconPut = document.querySelector(".hero__icon-put img");

let selectedCryptoPut = null;
let cryptos = []; // Сюда будем загружать криптовалюты

// Функция для получения цен криптовалют
async function fetchCryptoPrices() {
  const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,ethereum,tether,binancecoin,tron,dogecoin,dai,toncoin&vs_currencies=rub");
  const data = await response.json();

  // Проверка на наличие данных для каждой криптовалюты
  cryptos = [
    { name: "USDT TRC20", price: data.tether?.rub ? data.tether.rub * 1.042 : 0, image: "./images/trc20.svg" },
    { name: "USDT BEP20", price: data.tether?.rub ? data.tether.rub * 1.042 : 0, image: "./images/trc20.svg" },
    { name: "USDT ERC20", price: data.tether?.rub ? data.tether.rub * 1.042 : 0, image: "./images/trc20.svg" },
    { name: "BTC", price: data.bitcoin?.rub ? data.bitcoin.rub * 1.042 : 0, image: "./images/btc.svg" },
    { name: "LTC", price: data.litecoin?.rub ? data.litecoin.rub * 1.042 : 0, image: "./images/ltc.svg" },
    { name: "BNB", price: data.binancecoin?.rub ? data.binancecoin.rub * 1.042 : 0, image: "./images/bnb.svg" },
    { name: "ETH", price: data.ethereum?.rub ? data.ethereum.rub * 1.028 : 0, image: "./images/eth.svg" },
    { name: "TRX", price: data.tron?.rub ? data.tron.rub * 1.042 : 0, image: "./images/trx.svg" }, 
    { name: "DOGE", price: data.dogecoin?.rub ? data.dogecoin.rub * 1.042 : 0, image: "./images/doge.svg" },
    { name: "DAI", price: data.dai?.rub ? data.dai.rub * 1.042 : 0, image: "./images/dai.svg" }, 
    { name: "TON", price: data.toncoin?.rub ? data.toncoin.rub * 1.042 : 0, image: "./images/ton.svg" },
  ];
}

async function updateCryptoList() {
  await fetchCryptoPrices();
  
  cryptoList.innerHTML = "";
  
  selectedCryptoPut = cryptos[0];
  curencyPrice.innerText = `${selectedCryptoPut.name}: ${selectedCryptoPut.price.toFixed(2)} ₽`;
  selectPuts.textContent = selectedCryptoPut.name;
  heroIconPut.src = selectedCryptoPut.image;

  cryptos.forEach((crypto, index) => {
    const li = document.createElement("li");
    li.classList.add("hero__dropdown-item");

    const icon = document.createElement("div");
    icon.classList.add("icon");
    const img = document.createElement("img");
    img.src = crypto.image;
    img.alt = crypto.name;
    icon.appendChild(img);

    const currency = document.createElement("div");
    currency.classList.add("hero__dropdown-cur");
    currency.textContent = crypto.name;

    li.appendChild(icon);
    li.appendChild(currency);

    li.addEventListener("click", () => {
      selectedCryptoPut = crypto;
      curencyPrice.innerText = `${crypto.name}: ${crypto.price.toFixed(2)} ₽`;
      selectPuts.textContent = crypto.name;
      heroIconPut.src = crypto.image;

      currencyInputPut.value = "";
      currencyInputSell.value = "";
    });

    cryptoList.appendChild(li);

    // Добавляем класс active к первому элементу
    if (index === 0) {
      li.classList.add("active");
    }
  });

  // Автоматически устанавливаем значение 100 в currency-input-put
  currencyInputPut.value = "100";
  currencyInputPut.dispatchEvent(new Event('input')); // Имитируем ввод, чтобы обновить currencyInputSell
}

// Обработчик ввода для currencyInputPut
currencyInputPut.addEventListener("input", () => {
  const amount = parseFloat(currencyInputPut.value);
  if (!isNaN(amount) && amount > 0) {
    const result = amount * selectedCryptoPut.price;
    currencyInputSell.value = result.toFixed(2);
  } else {
    currencyInputSell.value = "";
  }
});

// Обработчик ввода для currencyInputSell
currencyInputSell.addEventListener("input", () => {
  const amount = parseFloat(currencyInputSell.value);
  if (!isNaN(amount) && amount > 0) {
    const result = amount / selectedCryptoPut.price;
    currencyInputPut.value = result.toFixed(2);
  } else {
    currencyInputPut.value = "";
  }
});

// Запуск обновления списка криптовалют при загрузке страницы
document.addEventListener("DOMContentLoaded", updateCryptoList);

// Для списка криптовалют для продажи
const changeSellContainer = document.querySelector(".hero__change-sell");

if (changeSellContainer) {
  const sellIcon = changeSellContainer.querySelector(".hero__icon-sell img");
  const sellList = changeSellContainer.querySelector(".hero__dropdown-sell");
  const heroSelectSell = document.querySelector(".hero__select-sell");

  const cryptosForSell = [
    { name: "VISA/MASTERCARD RUB", image: "./images/card.svg" },
    { name: "Райффайзен RUB", image: "./images/b1.png" },
    { name: "Сбербанк RUB", image: "./images/b7.png" },
    { name: "ТКС cash-in RUB", image: "./images/b2.png" },
    { name: "СБП RUB", image: "./images/b3.webp" },
    { name: "ВТБ RUB", image: "./images/b4.png" },
    { name: "Альфа-Банк RUB", image: "./images/b5.svg" },
    { name: "Тинькофф RUB", image: "./images/b6.png" },
  ];

  let selectedCryptoSell = cryptosForSell[0];

  function updateCryptoSellList() {
    sellList.innerHTML = "";

    cryptosForSell.forEach((crypto, index) => {
      const li = document.createElement("li");
      li.classList.add("hero__dropdown-item");

      const icon = document.createElement("div");
      icon.classList.add("icon");

      const img = document.createElement("img");
      img.src = crypto.image;
      img.alt = crypto.name;
      icon.appendChild(img);

      const currency = document.createElement("div");
      currency.classList.add("hero__dropdown-cur");
      currency.textContent = crypto.name;

      li.appendChild(icon);
      li.appendChild(currency);

      li.addEventListener("click", () => {
        selectedCryptoSell = crypto;
        sellIcon.src = crypto.image;
        sellIcon.alt = crypto.name;

        // Обновляем текст в hero__select-sell
        heroSelectSell.textContent = crypto.name;

        const selectedItem = changeSellContainer.querySelector(".hero__select-item.active");
        if (selectedItem) {
          selectedItem.textContent = crypto.name;
          const icon = selectedItem.querySelector(".svg-icon img");
          if (icon) {
            icon.src = crypto.image;
            icon.alt = crypto.name;
          } else {
            const newIcon = document.createElement("img");
            newIcon.src = crypto.image;
            newIcon.alt = crypto.name;
            selectedItem.querySelector(".svg-icon").appendChild(newIcon);
          }
        }
      });

      sellList.appendChild(li);

      // Добавляем класс active к первому элементу
      if (index === 0) {
        li.classList.add("active");
        sellIcon.src = crypto.image;
        sellIcon.alt = crypto.name;

        // Устанавливаем начальный текст в hero__select-sell
        heroSelectSell.textContent = crypto.name;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", updateCryptoSellList);
}
