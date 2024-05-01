import throttle from 'lodash/throttle';

//zapisywanie danych w localStorage
function saveFormDataToLocalStorage() {
  const formData = {
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Znajdź formularz i nasłuchuj zdarzenia "input" na polach formularza
const feedbackForm = document.querySelector('.feedback-form');
feedbackForm.addEventListener(
  'input',
  throttle(saveFormDataToLocalStorage, 500)
);
// Funkcja, która wczytuje dane z Local Storage i wypełnia nimi pola formularza
function loadFormDataFromLocalStorage() {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    const emailInput = document.querySelector('input[name="email"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');

    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
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
