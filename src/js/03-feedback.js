import throttle from 'lodash.throttle';

var throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormDataInput, 500));

populateFormData();

function onFormSubmit(evt) {
  evt.preventDefault();
  
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const formData = {};

function onFormDataInput() {
  formData.email = email.value;
  formData.message = textarea.value;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);

  console.log(parsedFormData); 
}

function populateFormData() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);

  if (parsedFormData) {
    Object.entries(parsedFormData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}