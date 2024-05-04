import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const submitButton = form.querySelector('button[type="submit"]');

const formDataStr = localStorage.getItem('feedback-form-state');
if (formDataStr) {
  const formData = JSON.parse(formDataStr);
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

if (
  !form.elements.email.value.includes('@') ||
  form.elements.message.value == ''
) {
  console.log('disabled');
  submitButton.disabled = true;
}

const saveToLocalStorage = throttle(() => {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}, 500);

form.addEventListener('input', () => {
  saveToLocalStorage();

  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();

  submitButton.disabled = emailValue.inclused('@') || !messageValue;
});

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();

  console.log({
    email: emailValue,
    message: messageValue,
  });

  localStorage.removeItem('feedback-form-state');
  form.elements.email.value = '';
  form.elements.message.value = '';
  submitButton.disabled = true;
});
