// Import biblioteki lodash.throttle
import throttle from 'lodash.throttle';

// Funkcja do zapisywania stanu formularza w local storage
function saveToLocalStorage() {
  const formData = {
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Funkcja do wypełniania pól formularza danymi z local storage
function fillFormFromLocalStorage() {
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    document.querySelector('input[name="email"]').value = formData.email;
    document.querySelector('textarea[name="message"]').value = formData.message;
  }
}

// Funkcja do czyszczenia local storage i pól formularza po wysłaniu formularza
function clearLocalStorageAndForm() {
  localStorage.removeItem('feedback-form-state');
  document.querySelector('input[name="email"]').value = '';
  document.querySelector('textarea[name="message"]').value = '';
}

// Funkcja do wylogowywania danych z formularza
function logFormData() {
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    console.log('Logged form data:', formData);
  }
}

// Dodanie obsługi zdarzeń dla formularza
document.addEventListener('DOMContentLoaded', function () {
  fillFormFromLocalStorage();

  document
    .querySelector('.feedback-form')
    .addEventListener('input', throttle(saveToLocalStorage, 500));

  document
    .querySelector('.feedback-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      clearLocalStorageAndForm();
      logFormData();
    });
});
