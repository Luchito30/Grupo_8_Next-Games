const form = document.getElementById('myForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('LastName');
const userNameInput = document.getElementById('userName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const provinceInput = document.getElementById('province');
const zipCodeInput = document.getElementById('zipCode');
const messageContainer = document.getElementById('messageContainer');
const imageInput = document.getElementById('formFile');
const imagePreview = document.getElementById('profile--imgavatar');

firstNameInput.addEventListener('input', validateFirstName);
lastNameInput.addEventListener('input', validateLastName);
userNameInput.addEventListener('input', validateUserName);
addressInput.addEventListener('input', validateAddress);
cityInput.addEventListener('input', validateCity);
provinceInput.addEventListener('input', validateProvince);
zipCodeInput.addEventListener('input', validateZipCode);

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isUserNameValid = validateUserName();
    const isAddressValid = validateAddress();
    const isCityValid = validateCity();
    const isProvinceValid = validateProvince();
    const isZipCodeValid = validateZipCode();

    if (
        isFirstNameValid &&
        isLastNameValid &&
        isUserNameValid &&
        isAddressValid &&
        isCityValid &&
        isProvinceValid &&
        isZipCodeValid
    ) {
        form.submit();
        
        setTimeout(function () {
            showMessage('Datos actualizados');
        }, 500); // Cambia el valor si deseas ajustar el retraso antes de mostrar el mensaje
    } else {
        scrollToError();
    }
}

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');

if (message) {
    showMessage(message);
}

function showMessage(message) {
    console.log("Mostrando mensaje:", message);
    messageContainer.textContent = message;
    messageContainer.style.backgroundColor = '#dff0d8';
    messageContainer.style.color = '#3c763d';
    messageContainer.style.padding = '10px';
    messageContainer.style.marginBottom = '20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.textAlign = 'center';

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'close-button';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '32px';
    closeButton.style.right = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'black';
    closeButton.style.fontSize = '21px';
    messageContainer.appendChild(closeButton);

    function closeMessage() {
        messageContainer.style.display = 'none';
    }

    closeButton.addEventListener('click', closeMessage);
}

async function verifyuserName(userName) {
    try {
        const response = await fetch('/api/users/verify-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName
            })
        });

        const result = await response.json();

        return result.data.existUser;
    } catch (error) {
        console.error(error);
        throw {
            status: 500,
            message: error.message
        };
    }
}

imageInput.addEventListener('change', function() {
    const file = this.files[0];
  const validExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
  const maxSizeInBytes = 1 * 1024 * 1024; 

  if (validExtensions.test(file.name) && file.size <= maxSizeInBytes) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
    imageInput.classList.remove('is-invalid');
  } else {
    imageInput.classList.add('is-invalid');
    imageInput.value = '';

    let errorMessage = 'Formato de imagen no válido. Se aceptan archivos JPG, JPEG, PNG, GIF y WebP.';
    if (file.size > maxSizeInBytes) {
      errorMessage = 'El tamaño de la imagen excede el límite permitido (1 MB).';
    }
    showMessage(errorMessage);
  }
});

function validateFirstName() {
    const value = firstNameInput.value.trim();
    const errorContainer = firstNameInput.nextElementSibling;

    if (value === '') {
        firstNameInput.classList.remove('is-valid');
        firstNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'El nombre es obligatorio';
        return false;
    } else if (value.length < 2) {
        firstNameInput.classList.remove('is-valid');
        firstNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Mínimo dos letras';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        firstNameInput.classList.remove('is-valid');
        firstNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Solo caracteres alfabéticos';
        return false;
    } else {
        firstNameInput.classList.remove('is-invalid');
        firstNameInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

function validateLastName() {
    const value = lastNameInput.value.trim();
    const errorContainer = lastNameInput.nextElementSibling;

    if (value === '') {
        lastNameInput.classList.remove('is-valid');
        lastNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'El apellido es obligatorio';
        return false;
    } else if (value.length < 2) {
        lastNameInput.classList.remove('is-valid');
        lastNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Mínimo dos letras';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        lastNameInput.classList.remove('is-valid');
        lastNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Solo caracteres alfabéticos';
        return false;
    } else {
        lastNameInput.classList.remove('is-invalid');
        lastNameInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

const userNameField = document.querySelector('input[name="userName"]');
let previousUserNameValue = userNameField.value;

async function validateUserName() {
    const value = userNameInput.value.trim();
    const errorContainer = userNameInput.nextElementSibling;

    if (value === '') {
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Debes escribir un usuario';
        return false;
    } else if (value.length < 2) {
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'Mínimo dos letras';
        return false;
    } else if (value.toLowerCase() === previousUserNameValue.toLowerCase()) {
        userNameInput.classList.remove('is-valid');
        return false;
    } else if (await verifyuserName(this.value.trim())) {
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('is-invalid');
        errorContainer.textContent = 'El usuario ya se encuentra registrado';
        return false;
    } else {
        userNameInput.classList.remove('is-invalid');
        userNameInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

function validateAddress() {
    const addressInput = document.getElementById('address');
    const errorContainer = document.getElementById('addressError');

    if (addressInput.value.trim() === '') {
        addressInput.classList.add('is-invalid');
        addressInput.classList.remove('is-valid');
        errorContainer.textContent = 'La dirección es obligatoria';
        return false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(addressInput.value.trim())) {
        addressInput.classList.add('is-invalid');
        addressInput.classList.remove('is-valid');
        errorContainer.textContent = 'Dirección inválida';
        return false;
    } else {
        addressInput.classList.remove('is-invalid');
        addressInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

function validateCity() {
    const cityInput = document.getElementById('city');
    const errorContainer = document.getElementById('cityError');

    if (cityInput.value.trim() === '') {
        cityInput.classList.add('is-invalid');
        cityInput.classList.remove('is-valid');
        errorContainer.textContent = 'La ciudad es obligatoria';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(cityInput.value.trim())) {
        cityInput.classList.add('is-invalid');
        cityInput.classList.remove('is-valid');
        errorContainer.textContent = 'Ciudad inválida';
        return false;
    } else {
        cityInput.classList.remove('is-invalid');
        cityInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

function validateProvince() {
    const provinceInput = document.getElementById('province');
    const errorContainer = document.getElementById('provinceError');

    if (provinceInput.value.trim() === '') {
        provinceInput.classList.add('is-invalid');
        provinceInput.classList.remove('is-valid');
        errorContainer.textContent = 'La provincia es obligatoria';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(provinceInput.value.trim())) {
        provinceInput.classList.add('is-invalid');
        provinceInput.classList.remove('is-valid');
        errorContainer.textContent = 'Provincia inválida';
        return false;
    } else {
        provinceInput.classList.remove('is-invalid');
        provinceInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}

function validateZipCode() {
    const zipCodeInput = document.getElementById('zipCode');
    const errorContainer = document.getElementById('zipCodeError');

    if (zipCodeInput.value.trim() === '') {
        zipCodeInput.classList.add('is-invalid');
        zipCodeInput.classList.remove('is-valid');
        errorContainer.textContent = 'El código postal es obligatorio';
        return false;
    } else if (!/^[0-9]+$/.test(zipCodeInput.value.trim())) {
        zipCodeInput.classList.add('is-invalid');
        zipCodeInput.classList.remove('is-valid');
        errorContainer.textContent = 'Solo se permiten números';
        return false;
    } else if (zipCodeInput.value.trim().length > 8) {
        zipCodeInput.classList.add('is-invalid');
        zipCodeInput.classList.remove('is-valid');
        errorContainer.textContent = 'El código postal no puede tener más de 8 caracteres';
        return false;
    } else {
        zipCodeInput.classList.remove('is-invalid');
        zipCodeInput.classList.add('is-valid');
        errorContainer.textContent = '';
        return true;
    }
}



