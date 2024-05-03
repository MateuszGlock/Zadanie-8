const form = document.querySelector('form.feedback-form');

const formDataStr = localStorage.getItem('feedback-form-state');
if (formDataStr) {
  const formData = JSON.parse(formDataStr);
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

const saveToLocalStorage = _.throttle(() => {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}, 500);

form.addEventListener('input', saveToLocalStorage);

form.addEventListener('submit', ev => {
  ev.preventDefault();
  console.log({
    email: ev.target.elements.email.value,
    message: ev.target.elements.message.value,
  });
  localStorage.clear();
  form.elements.email.value = '';
  form.elements.message.value = '';
});
