// Import biblioteki lodash.throttle
import throttle from "lodash/throttle";

// Funkcja, która zapisuje dane w Local Storage
function saveFormDataToLocalStorage() {
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

// Znajdź formularz i nasłuchuj zdarzenia "input" na polach formularza
const feedbackForm = document.querySelector(".feedback-form");
feedbackForm.addEventListener(
  "input",
  throttle(saveFormDataToLocalStorage, 500)
);
// Funkcja, która wczytuje dane z Local Storage i wypełnia nimi pola formularza
function loadFormDataFromLocalStorage() {
  const savedFormData = localStorage.getItem("feedback-form-state");
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    const emailInput = document.querySelector('input[name="email"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');

    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

// Wywołaj funkcję wczytującą dane podczas ładowania strony
window.addEventListener("load", loadFormDataFromLocalStorage);
// Funkcja obsługująca wysłanie formularza
function handleSubmit(event) {
  event.preventDefault();

  // Wyczyść Local Storage
  localStorage.removeItem("feedback-form-state");

  // Wyczyść pola formularza
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');
  emailInput.value = "";
  messageTextarea.value = "";

  // Wyloguj dane do konsoli
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log("Wysłane dane:", formData);
}

// Nasłuchuj zdarzenia "submit" na formularzu
feedbackForm.addEventListener("submit", handleSubmit);
