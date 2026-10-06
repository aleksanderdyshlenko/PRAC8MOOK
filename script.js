// === Получаем элементы формы ===
const form        = document.getElementById('registerForm');
const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const passInput   = document.getElementById('password');
const cityInput   = document.getElementById('city');
const commentArea = document.getElementById('comment');
const counter     = document.getElementById('counter');
const successMsg  = document.getElementById('successMessage');

// === Регулярное выражение для email ===
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// === Функция показа ошибки ===
function setError(input, message) {
  const errorEl = document.getElementById('error-' + input.id);
  errorEl.textContent = message;
  input.classList.remove('valid');
  input.classList.add('invalid');
}

// === Функция успешной валидации поля ===
function setValid(input) {
  const errorEl = document.getElementById('error-' + input.id);
  errorEl.textContent = '';
  input.classList.remove('invalid');
  input.classList.add('valid');
}

// === Валидация отдельного поля ===
function validateName() {
  const value = nameInput.value.trim();
  if (value === '') {
    setError(nameInput, 'Введите имя');
    return false;
  }
  if (value.length < 2) {
    setError(nameInput, 'Имя должно содержать минимум 2 символа');
    return false;
  }
  setValid(nameInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value === '') {
    setError(emailInput, 'Введите email');
    return false;
  }
  if (!EMAIL_REGEX.test(value)) {
    setError(emailInput, 'Некорректный email');
    return false;
  }
  setValid(emailInput);
  return true;
}

function validatePassword() {
  const value = passInput.value;
  if (value === '') {
    setError(passInput, 'Введите пароль');
    return false;
  }
  if (value.length < 6) {
    setError(passInput, 'Пароль должен содержать минимум 6 символов');
    return false;
  }
  setValid(passInput);
  return true;
}

function validateCity() {
  if (cityInput.value === '') {
    setError(cityInput, 'Выберите город');
    return false;
  }
  setValid(cityInput);
  return true;
}

// === Живая валидация при вводе (событие input) ===
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passInput.addEventListener('input', validatePassword);
cityInput.addEventListener('change', validateCity);

// === Счётчик символов для textarea ===
commentArea.addEventListener('input', () => {
  counter.textContent = `${commentArea.value.length} / 200`;
});

// === Обработка отправки формы ===
form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем стандартную отправку

  const isNameOk  = validateName();
  const isEmailOk = validateEmail();
  const isPassOk  = validatePassword();
  const isCityOk  = validateCity();

  if (isNameOk && isEmailOk && isPassOk && isCityOk) {
    successMsg.classList.add('show');
    form.reset();
    counter.textContent = '0 / 200';

    // Убираем подсветку после сброса
    [nameInput, emailInput, passInput, cityInput].forEach(el => {
      el.classList.remove('valid', 'invalid');
    });

    // Скрываем сообщение через 3 секунды
    setTimeout(() => successMsg.classList.remove('show'), 3000);
  }
});
