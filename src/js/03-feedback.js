import throttle from 'lodash.throttle';

var throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormDataInput, 500));

populateFormData();

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const formData = {};

function onFormDataInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);
  console.log(parsedFormData);

  if (parsedFormData) {
    Object.entries(parsedFormData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}