let formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

const saveFormData = data => {
  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const loadFormData = () => {
  try {
    return JSON.parse(localStorage.getItem('feedback-form-state'));
  } catch (error) {
    console.log(error);
  }
};

const onLoadFormField = formFields => {
  const formDataFromLS = loadFormData();

  if (!formDataFromLS) return;

  Object.assign(formData, formDataFromLS);
  refs.form.elements.email.value = formData.email || '';
  refs.form.elements.message.value = formData.message || '';
};
onLoadFormField(refs.form);

const onFormField = event => {
  formData[event.target.name] = event.target.value.trim();
  saveFormData(formData);
};

const onFormSubmit = event => {
  event.preventDefault();
  const { email, message } = event.target;

  if (!email.value.trim() || !message.value.trim())
    return alert('Fill please all fields');

  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  formData.email = '';
  formData.message = '';
};

refs.form.addEventListener('input', onFormField);
refs.form.addEventListener('submit', onFormSubmit);
