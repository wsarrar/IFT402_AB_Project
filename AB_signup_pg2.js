const validateForm = formSelector => {
  const formElement = document.querySelector(formSelector);
  let error = 0;

  const validationOptions = [
    {
      attribute: 'minlength',
      isValid: input => input.value && input.value.length >= parseInt(input.minLength, 10),
      errorMessage: (input, label) => `${label.textContent} needs to be at least ${input.minLength} characters`,
    },
    {
      attribute: 'pattern',
      isValid: input => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) => `${label.textContent} should be a valid email`,
    },
    {
      attribute: 'required',
      isValid: input => input.value.trim() !== '',
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
    {
      attribute: 'match-password',
      isValid: input => {
        const matchPassword = formElement.querySelector(`input[match-password="${input.id}"]`);
        return matchPassword && matchPassword.value === input.value;
      },
      errorMessage: (input, label) => `Passwords do not match`,
    },
  ];

  // Added function to check the password and confirm-password fields
  const checkPasswordMatch = () => {
    const passwordInput = formElement.querySelector('input[type="password"]');
    const confirmPasswordInput = formElement.querySelector('input[match-password]');

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add('border-red-700')
      confirmPasswordInput.classList.remove('border-green-700')
      return true;
    } else {
      confirmPasswordInput.classList.remove('border-red-700')
      confirmPasswordInput.classList.add('border-green-700')
      return false;
    }
  };

  // Added an event listener that checks the password match before the form is submitted
  window.addEventListener('beforeunload', (event) => {      
    if (checkPasswordMatch()) {
      event.preventDefault();
      console.log('Preventing form submission due to incorrect passwords.');
      return 'Do you want to leave the page without submitting the form?';
    }
  });

  const validateSingleFormGroup = formGroup => {
    const label = formGroup.querySelector('label');
    const input = formGroup.querySelector('input, textarea');
    const errorContainer = formGroup.querySelector('.error');
    const errorIcon = formGroup.querySelector('.error-icon');
    const successIcon = formGroup.querySelector('.success-icon');

    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        input.classList.add('border-red-700');
        input.classList.remove('border-green-700');
        successIcon.classList.add('hidden');
        errorIcon.classList.remove('hidden');

        // Check if the error is due to the password match validation
        if (option.attribute === 'match-password') {
          input.classList.add('bg-red-100');
        }

        formGroupError = true;
        break;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = '';
      input.classList.add('border-green-700');
      input.classList.remove('border-red-700');
      successIcon.classList.remove('hidden');
      errorIcon.classList.add('hidden');

      // If the input is the confirm password, remove the red bg-color
      if (input.hasAttribute('match-password')) {
        input.classList.remove('bg-red-100');
      }
    }
  };

  const validateAllFormGroups = () => {
    const formGroups = Array.from(formElement.querySelectorAll('.formGroup'));

    formGroups.forEach(formGroup => {
      validateSingleFormGroup(formGroup);
    });
  };

  // Disable HTML5 Validation
  formElement.setAttribute('novalidate', '');

  // Enable validation for each control whilst updating form
  Array.from(formElement.elements).forEach(element =>
    element.addEventListener('blur', event => {
      if (['password', 'confirm-password'].includes(event.srcElement.id)) {
        const passwordInput = formElement.querySelector('input[type="password"]');
        const confirmPasswordInput = formElement.querySelector('input[match-password]');
  
        if (passwordInput.value !== confirmPasswordInput.value) {
          const confirmPasswordFormGroup = confirmPasswordInput.parentElement.parentElement;
          const confirmPasswordErrorContainer = confirmPasswordFormGroup.querySelector('.error');
          confirmPasswordErrorContainer.textContent = 'Passwords do not match';
          confirmPasswordInput.classList.add('border-red-700');
          confirmPasswordInput.classList.remove('border-green-700');
        }
      }
  
      validateSingleFormGroup(event.srcElement.parentElement.parentElement);
    })
  );

  // Only validate form when submitting
  formElement.addEventListener('submit', event => {
    event.preventDefault();
    validateAllFormGroups();

    // Custom validation logic
    const errorContainers = formElement.querySelectorAll('.error');
    let error = 0;
    errorContainers.forEach(container => {
      if (container.textContent.trim() !== '') {
        error++;
      }
    });

    if (error === 0) {
      // Check if passwords match      
      const passwordInput = formElement.querySelector('input[type="password"]');
      const confirmPasswordInput = formElement.querySelector('input[match-password]');
      if (passwordInput.value !== confirmPasswordInput.value) {
        const confirmPasswordFormGroup = confirmPasswordInput.parentElement.parentElement;
        const confirmPasswordErrorContainer = confirmPasswordFormGroup.querySelector('.error');
        confirmPasswordErrorContainer.textContent = 'Passwords do not match';
        confirmPasswordInput.classList.add('border-red-700');
        confirmPasswordInput.classList.remove('border-green-700');
        error++;
      }

      if (error === 0) {
        // Proceed with form submission
        // You can add your submission logic here
        const formData = new FormData(formElement);
        // Example: Fetch request to submit form data
        fetch(formElement.action, {
          method: formElement.method,
          body: formData
        })
        .then(response => {
          if (response.ok) {
            // Handle successful form submission
            console.log('Form submitted successfully');
            // Optionally, you can redirect the user to another page
            window.location.href = 'success.html';
          } else {
            // Handle form submission failure
            console.error('Form submission failed');
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
      } else {
        // There are errors in the form, do not submit
        console.log('Form has errors. Please correct them.');
      }
    }
  });
};

// Call validateForm function with the form selector
validateForm('#registrationForm');
