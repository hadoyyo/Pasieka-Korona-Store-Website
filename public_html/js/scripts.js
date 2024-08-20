/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var myModal = new bootstrap.Modal(document.getElementById('myModal'));
var addedToCartModal = new bootstrap.Modal(document.getElementById('addedToCartModal'));

document.querySelectorAll('[data-bs-toggle="modal"]').forEach(function(button) {
  button.addEventListener('click', function() {
    var name = this.getAttribute('data-article-name');
    var price = this.getAttribute('data-article-price');
    var weight = this.getAttribute('data-article-weight');
    var description = this.getAttribute('data-article-description');
    var imageSrc = this.getAttribute('data-article-image');

    document.getElementById('articleName').textContent = name;
    document.getElementById('articlePrice').textContent = price+ " zł";
    document.getElementById('articleWeight').textContent = weight;
    document.getElementById('articleDescription').textContent = description;
    document.getElementById('articleImage').setAttribute('src', imageSrc);

    myModal.show();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cartCountElement = document.getElementById('cartCount');
  
  function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
      cartCountElement.innerText = totalItems;
  }

  // Add event listener to "Add to cart" buttons on cards
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', event => {
          event.preventDefault();
          const card = button.closest('.card');
          const productName = card.querySelector('.fw-bolder').innerText;
          const productPrice = parseFloat(card.querySelector('.card-body .text-center').innerText.replace(' zł', ''));
          const productWeight = card.querySelector('.card-body .text-center').nextElementSibling.innerText;
          const quantity = 1;
          addToCart(productName, productPrice, productWeight, quantity);
      });
  });

  // Add event listener to "Add to cart" button in modal
  document.getElementById('addToCartBtn').addEventListener('click', () => {
      const productName = document.getElementById('articleName').innerText;
      const productPrice = parseFloat(document.getElementById('articlePrice').innerText.replace(' zł', ''));
      const productWeight = document.getElementById('articleWeight').innerText;
      const quantity = parseInt(document.getElementById('quantityInput').value);
      addToCart(productName, productPrice, productWeight, quantity);
  });

  // Function to add product to cart
  function addToCart(name, price, weight, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(product => product.name === name);
    
    if (quantity > 0) {
        quantity = quantity;
    }
    else
    {
      quantity = 1;
    }

    if (existingProductIndex > -1) {
        // Update quantity if product already exists in the cart
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to the cart
        cart.push({ name, price, weight, quantity });
    }

      localStorage.setItem('cart', JSON.stringify(cart));
      
  myModal.hide();
  addedToCartModal.show();
  updateCartCount();
  }

  // Function to calculate total price of all products in the cart
  function calculateTotalPrice() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  // Update cart count on page load
  updateCartCount();

  // Update modal with product data
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
      button.addEventListener('click', () => {
          const productName = button.getAttribute('data-article-name');
          const productPrice = button.getAttribute('data-article-price');
          const productWeight = button.getAttribute('data-article-weight');
          const productDescription = button.getAttribute('data-article-description');
          const productImage = button.getAttribute('data-article-image');

          document.getElementById('articleName').innerText = productName;
          document.getElementById('articlePrice').innerText = `${productPrice} zł`;
          document.getElementById('articleWeight').innerText = productWeight;
          document.getElementById('articleDescription').innerText = productDescription;
          document.getElementById('articleImage').src = productImage;
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContentsElement = document.getElementById('cartContents');
        const totalPriceElement = document.getElementById('totalPrice');
        const emptyCartMessageElement = document.getElementById('emptyCartMessage');
        const cartTableContainerElement = document.getElementById('cartTableContainer');
        const paymentEnableElement = document.getElementById('paymentEnable');
        const person = JSON.parse(localStorage.getItem('person'));

        cartContentsElement.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            emptyCartMessageElement.style.display = 'block';
            cartTableContainerElement.style.display = 'none';
            paymentEnableElement.style.display = 'none';
        }
         else {
            emptyCartMessageElement.style.display = 'none';
            cartTableContainerElement.style.display = 'block';

            cart.forEach((product, index) => {
                const productTotalPrice = product.price * product.quantity;
                totalPrice += productTotalPrice;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="text-center">${product.name}</td>
                    <td class="text-center" id="th-secondary">${product.weight}</td>
                    <td class="text-center">
                        <div class="quantity-controls">
                            <button class="btn btn-sm btn-outline-secondary detail-hidden" onclick="increaseQuantity(${index})">+</button>
                            <span>${product.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary detail-hidden" onclick="decreaseQuantity(${index})">-</button>
                        </div>
                    </td>
                    <td class="text-center" id="th-secondary">${product.price.toFixed(2)} zł</td>
                    <td class="text-center">${productTotalPrice.toFixed(2)} zł</td>
                    <td class="text-center detail-hidden">
                        <button class="btn btn-sm btn-outline-danger align-items-center" onclick="removeFromCart(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg></button>
                    </td>
                `;
                cartContentsElement.appendChild(row);
            });

            totalPriceElement.innerText = totalPrice.toFixed(2);
        }
    }

    // Funkcja do aktualizacji licznika produktów w koszyku
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.innerText = totalItems;
        }
    }

    // Definiujemy funkcje globalnie
    window.increaseQuantity = function(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }

    window.decreaseQuantity = function(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }

    window.removeFromCart = function(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }

    // Update cart count on page load
    updateCartCount();
    updateCartDisplay();
});

document.getElementById('quantityInput').addEventListener('keydown', function (e) {
  // Blokowanie wprowadzania niepożądanych znaków
  if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
  }
});

document.getElementById('quantityInput').addEventListener('input', function (e) {
  // Usunięcie wszystkich niepożądanych znaków
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

//Fetch API

"use strict";

const API = "a1c768c791c9e554744dc433ab9d1ecd";

const dayEl = document.querySelector(".default_day");
const dateEl = document.querySelector(".default_date");
const btnEl = document.querySelector(".btn_search");
const inputEl = document.querySelector(".input_field");

const iconsContainer = document.querySelector(".icons");
const dayInfoEl = document.querySelector(".day_info");
const listContentEl = document.querySelector(".list_content ul");

const days = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

// display the day
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

// display date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

console.log();
dateEl.textContent = date + " " + month + " " + year;

// add event
btnEl.addEventListener("click", (e) => {
  e.preventDefault();

  // check empty value
  if (inputEl.value !== "") {
    const Search = inputEl.value;
    inputEl.value = "";
    findLocation(Search);
  } else {
    console.log("Please Enter City or Country Name");
  }
});

async function findLocation(name) {
  iconsContainer.innerHTML = "";
  dayInfoEl.innerHTML = "";
  listContentEl.innerHTML = "";
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&lang=pl`;
    const data = await fetch(API_URL);
    const result = await data.json();
    console.log(result);

    if (result.cod !== "404") {
      // display image content
      const ImageContent = displayImageContent(result);

      // display right side content
      const rightSide = rightSideContent(result);

      // forecast function
      displayForeCast(result.coord.lat, result.coord.lon);

      setTimeout(() => {
        iconsContainer.insertAdjacentHTML("afterbegin", ImageContent);
        iconsContainer.classList.add("fadeIn");
        dayInfoEl.insertAdjacentHTML("afterbegin", rightSide);
      }, 1500);
    } else {
      const message = `<h2 class="weather_temp">${result.cod}</h2>
      <h3 class="cloudtxt">${result.message}</h3>`;
      iconsContainer.insertAdjacentHTML("afterbegin", message);
    }
  } catch (error) {}
}

// display image content and temp
function displayImageContent(data) {
  return `<img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@4x.png" alt="" />
    <h2 class="weather_temp">${Math.round(data.main.temp - 275.15)}°C</h2>
    <h3 class="cloudtxt">${data.weather[0].description}</h3>`;
}

// display the right side content
function rightSideContent(result) {
  return `<div class="content">
          <p class="title">Miejscowość</p>
          <span class="value">${result.name}</span>
        </div>
        <div class="content">
          <p class="title">Temperatura</p>
          <span class="value">${Math.round(result.main.temp - 275.15)}°C</span>
        </div>
        <div class="content">
          <p class="title">Wilgotność</p>
          <span class="value">${result.main.humidity}%</span>
        </div>
        <div class="content">
          <p class="title">Prędkość wiatru</p>
          <span class="value">${result.wind.speed} Km/h</span>
        </div>`;
}

async function displayForeCast(lat, long) {
  const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API}`;
  const data = await fetch(ForeCast_API);
  const result = await data.json();
  // filter the forecast
  const uniqeForeCastDays = [];
  const daysForecast = result.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqeForeCastDays.includes(forecastDate)) {
      return uniqeForeCastDays.push(forecastDate);
    }
  });
  console.log(daysForecast);

  daysForecast.forEach((content, indx) => {
    if (indx <= 3) {
      listContentEl.insertAdjacentHTML("afterbegin", forecast(content));
    }
  });
}

// forecast html element data
function forecast(frContent) {
  const day = new Date(frContent.dt_txt);
  const dayName = days[day.getDay()];
  const splitDay = dayName.split("", 3);
  const joinDay = splitDay.join("");

  // console.log(dayName);

  return `<li>
  <img src="https://openweathermap.org/img/wn/${
    frContent.weather[0].icon
  }@2x.png" />
  <span>${joinDay}</span>
  <span class="day_temp">${Math.round(frContent.main.temp - 275.15)}°C</span>
</li>`;
}
window.addEventListener("DOMContentLoaded", () => {
    findLocation("Warszawa");
  });

  function validateForm() {
    var imieInput = document.getElementById("imie");
    var imieValue = imieInput.value.trim();
    var imieError = document.getElementById("imieError");
  
    var nazwiskoInput = document.getElementById("nazwisko");
    var nazwiskoValue = nazwiskoInput.value.trim();
    var nazwiskoError = document.getElementById("nazwiskoError");
  
    var ulicaInput = document.getElementById("ulica");
    var ulicaValue = ulicaInput.value.trim();
    var ulicaError = document.getElementById("ulicaError");
  
    var miejscowoscInput = document.getElementById("miejscowosc");
    var miejscowoscValue = miejscowoscInput.value.trim();
    var miejscowoscError = document.getElementById("miejscowoscError");
  
    var numerBudynkuInput = document.getElementById("numerBudynku");
    var numerBudynkuValue = numerBudynkuInput.value.trim();
    var numerBudynkuError = document.getElementById("numerBudynkuError");
  
    var kodPocztowyInput = document.getElementById("kodPocztowy");
    var kodPocztowyValue = kodPocztowyInput.value.trim();
    var kodPocztowyError = document.getElementById("kodPocztowyError");
  
    var telefonInput = document.getElementById("telefon");
    var telefonValue = telefonInput.value.trim();
    var telefonError = document.getElementById("telefonError");
  
    var emailInput = document.getElementById("email");
    var emailValue = emailInput.value.trim();
    var emailError = document.getElementById("emailError");
  
    var provinceInput = document.getElementById("province");
    var provinceValue = provinceInput.value;
    var provinceError = document.getElementById("provinceError");
  
    var dostawaInput = document.querySelector('input[name="dostawa"]:checked');
    var dostawaValue = dostawaInput ? dostawaInput.value : "";
    var dostawaError = document.getElementById("dostawaError");
  
    var zgodaInput = document.getElementById("zgoda");
    var zgodaChecked = zgodaInput.checked;
    var zgodaError = document.getElementById("zgodaError");

    var regulaminInput = document.getElementById("regulamin");
    var regulaminChecked = regulaminInput.checked;
    var regulaminError = document.getElementById("regulaminError");
  
    var isValid = true;
  
    // Walidacja dla pola "Imię"
    if (!/^[A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]{1,}$/u.test(imieValue)) {
      imieError.textContent = "Imię musi zaczynać się z wielkiej litery i mieć minimum 2 znaki.";
      isValid = false;
    } else {
      imieError.textContent = "";
    }
  
    // Walidacja dla pola "Nazwisko"
    if (!/^[A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]{1,}(-[A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]{1,})?$/u.test(nazwiskoValue)) {
      nazwiskoError.textContent = "Nazwisko musi zaczynać się z wielkiej litery, mieć minimum 2 znaki i może być dwuczłonowe.";
      isValid = false;
    } else {
      nazwiskoError.textContent = "";
    }
  
    // Walidacja dla pola "Ulica"
if (!/^[A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]+(?: [A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]+)*$/u.test(ulicaValue)) {
  ulicaError.textContent = "Ulica musi zaczynać się z wielkiej litery i mieć minimum 2 znaki.";
  isValid = false;
} else {
  ulicaError.textContent = "";
}

  
    // Walidacja dla pola "Numer budynku"
    if (!/^\d+[a-zA-Z]?$/.test(numerBudynkuValue)) {
      numerBudynkuError.textContent = "Numer budynku musi być liczbą i może zawierać literę.";
      isValid = false;
    } else {
      numerBudynkuError.textContent = "";
    }
  
    // Walidacja dla pola "Miejscowość"
if (!/^[A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]+(?:[\s-][A-ZŻŹĆĘŚĄÓŁ][a-zżźćńółęąś]+)*$/u.test(miejscowoscValue)) {
  miejscowoscError.textContent = "Miejscowość musi zaczynać się z wielkiej litery i mieć minimum 2 znaki.";
  isValid = false;
} else {
  miejscowoscError.textContent = "";
}
  
    // Walidacja dla pola "Kod pocztowy"
    if (!/^\d{2}-\d{3}$/.test(kodPocztowyValue)) {
      kodPocztowyError.textContent = "Kod pocztowy musi mieć format 00-000.";
      isValid = false;
    } else {
      kodPocztowyError.textContent = "";
    }
  
    // Walidacja dla pola "Telefon"
    if (!/^\d{9}$/.test(telefonValue)) {
      telefonError.textContent = "Telefon musi mieć 9 cyfr.";
      isValid = false;
    } else {
      telefonError.textContent = "";
    }
  
    // Walidacja dla pola "Email"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError.textContent = "Wprowadź poprawny e-mail.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Walidacja dla pola "Województwo"
    if (provinceValue === "") {
      provinceError.textContent = "Wybierz województwo.";
      isValid = false;
    } else {
      provinceError.textContent = "";
    }
  
    // Walidacja dla pola "Metoda dostawy"
    if (!dostawaValue) {
      dostawaError.textContent = "Wybierz metodę dostawy.";
      isValid = false;
    } else {
      dostawaError.textContent = "";
    }
  
    // Walidacja dla pola "Zgoda na przetwarzanie danych"
    if (!zgodaChecked) {
      zgodaError.textContent = "Musisz wyrazić zgodę na przetwarzanie danych.";
      isValid = false;
    } else {
      zgodaError.textContent = "";
    }

    if (!regulaminChecked) {
      regulaminError.textContent = "Musisz zaakceptować regulamin.";
      isValid = false;
    } else {
      regulaminError.textContent = "";
    }
  
    if (isValid) {
      

      var imie = document.getElementById('imie').value;
      var nazwisko = document.getElementById('nazwisko').value;
      var ulica = document.getElementById('ulica').value;
      var numerBudynku = document.getElementById('numerBudynku').value;
      var numerLokalu = document.getElementById('numerLokalu').value;
      var province = document.getElementById('province').value;
      var miejscowosc = document.getElementById('miejscowosc').value;
      var kodPocztowy = document.getElementById('kodPocztowy').value;
      var telefon = document.getElementById('telefon').value;
      var email = document.getElementById('email').value;
      var deliveryMethod = document.querySelector('input[name="dostawa"]:checked');
      var deliveryCost = deliveryMethod.value;
      var dostawca = deliveryMethod.id;

      var person = {
          imie: imie,
          nazwisko: nazwisko,
          ulica: ulica,
          numerBudynku: numerBudynku,
          numerLokalu: numerLokalu,
          province: province,
          miejscowosc: miejscowosc,
          kodPocztowy: kodPocztowy,
          telefon: telefon,
          email: email,
          deliveryCost: deliveryCost,
          dostawca: dostawca,
      };

      // Zapisujemy dane w localStorage
      localStorage.setItem('person', JSON.stringify(person));
    
  window.location.href = 'payment.html';

return isValid;
}
} 

function generateOrderCode() {
  // Pobierz dane osoby z localStorage
  const person = JSON.parse(localStorage.getItem('person'));

  if (!person) {
    console.error("Brak danych osoby w localStorage.");
    return;
  }

  // Pobierz pierwszą literę imienia i nazwiska
  const firstLetterOfFirstName = person.imie.charAt(0).toUpperCase();
  const firstLetterOfLastName = person.nazwisko.charAt(0).toUpperCase();

  // Pobierz aktualną datę
  const date = new Date();

  // Formatowanie dnia tygodnia na dwa znaki
  const day = date.getDate().toString().padStart(2, '0');

  // Formatowanie miesiąca na dwa znaki
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  // Formatowanie roku na dwa znaki
  const year = date.getFullYear().toString().slice(-2);

  // Pobierz godzinę, minutę i sekundę
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Generowanie losowych dwóch znaków z wielkich liter i cyfr
  const randomChars = generateRandomChars(2);

  // Tworzenie kodu zamówienia z godziny, minuty, sekundy oraz losowych dwóch znaków
  const orderCode = `${firstLetterOfFirstName}${firstLetterOfLastName}${day}${month}${year}${hours}${minutes}${seconds}${randomChars}`;
  
  // Zapisz kod zamówienia do localStorage
  localStorage.setItem('orderCode', orderCode);
}

// Funkcja do generowania losowych znaków z wielkich liter i cyfr
function generateRandomChars(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function confirmation() {
  document.addEventListener('DOMContentLoaded', function() {
      // Pobierz numer zamówienia z localStorage
      const orderCode = localStorage.getItem('orderCode');

      // Pobierz dane dostawy z localStorage
      const savedDeliveryData = localStorage.getItem('person');
      const deliveryData = JSON.parse(savedDeliveryData);

      // Pobierz zawartość koszyka z localStorage
      const savedCartData = localStorage.getItem('cart');
      const cartData = JSON.parse(savedCartData);

      // Funkcja do formatu zawartości koszyka jako tekst
      function formatCartContents(cartItems) {
          let cartText = 'Produkt | Waga | Ilość | Cena | Łączna cena\n';
          cartItems.forEach(item => {
              cartText += `${item.produkt} | ${item.waga} | ${item.ilosc} | ${item.cena} | ${item.lacznaCena}\n`;
          });
          return cartText;
      }

      // Sformatuj zawartość koszyka
      const cartContents = formatCartContents(cartData);

      // Utwórz formularz do wysyłki
      const form = document.createElement('form');
      form.action = "mailto:hubertj10.pl@gmail.com";
      form.method = 'POST';

      // Tytuł wiadomości z numerem zamówienia
      const subject = document.createElement('input');
      subject.type = 'hidden';
      subject.name = 'subject';
      subject.value = `Zamówienie ${orderCode}`;
      form.appendChild(subject);

      // Zawartość koszyka
      const cartInput = document.createElement('input');
      cartInput.type = 'hidden';
      cartInput.name = 'description';
      cartInput.value = cartContents;
      form.appendChild(cartInput);

      // Email użytkownika (dodany jako ukryty, mimo że formularz jest wysyłany na ten email)
      const emailInput = document.createElement('input');
      emailInput.type = 'hidden';
      emailInput.name = 'email';
      emailInput.value = deliveryData.email;
      form.appendChild(emailInput);

      // Dodaj formularz do dokumentu i wyślij
      document.body.appendChild(form);
      form.submit();
  });
}

function savePaymentMethod() {
  var paymentMethod;

  // Pobranie wszystkich elementów radio z nazwą 'paymentMethod'
  var radios = document.getElementsByName('paymentMethod');

  // Iteracja po wszystkich elementach radio
  for (var i = 0; i < radios.length; i++) {
      // Sprawdzenie, który element jest zaznaczony
      if (radios[i].checked) {
          // Przypisanie wartości zaznaczonego elementu do zmiennej paymentMethod
          paymentMethod = radios[i].value;
          break;
      }
  }

  if (paymentMethod) {
      // Pobranie obiektu 'person' z localStorage
      var person = JSON.parse(localStorage.getItem('person')) || {};

      // Dodanie lub aktualizacja właściwości 'paymentMethod' w obiekcie 'person'
      person.paymentMethod = paymentMethod;

      // Zapisanie obiektu 'person' z powrotem do localStorage
      localStorage.setItem('person', JSON.stringify(person));
  }
}

function executeGenerateAndRedirect() {
  savePaymentMethod();
  generateOrderCode(); // Wywołaj funkcję generate()
  confirmation();
  location.href = 'thankyou.html'; // Przekieruj na stronę 'thankyou.html'
}
