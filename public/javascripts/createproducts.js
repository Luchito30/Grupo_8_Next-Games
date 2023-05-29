const $ = id => document.getElementById(id)
const formAddProduct = $('crear-item-from')
const inputName = $('name');
const inputPrecio = $('price');
const inputDiscount = $('discount');
const selectState = $('category');
const selectCategory = $('subCategory');
const inputDescription = $('description');
const inputImage = $('image');
const inputImages = $('images');

const msgError = (element, message, { target }) => {
  $(element).innerHTML = message
  target.classList.add('is-invalid')
}

const cleanError = (element, { target }) => {
  target.classList.remove('is-invalid')
  target.classList.remove('is-valid')
  $(element).innerHTML = null
}

inputName.addEventListener('blur', function (event) {
  switch (true) {
    case !this.value.trim():
      msgError('nameError', "El nombre del producto es obligatorio", event)
      break;
    case this.value.trim().length < 5:
      msgError('nameError', "El titulo debe tener minimo 5 caracteres", event)
      break;
    case this.value.trim().length > 50:
      msgError('nameError', "El titulo debe tener maximo 50 caracteres", event)
      break;
    default:
      this.classList.add('is-valid')
      break;
  }
})

inputName.addEventListener('focus', function (event) {
  cleanError('nameError', event)
})


inputPrecio.addEventListener('blur', function (event) {
  switch (true) {
    case !this.value.trim():
      msgError('precioError', "Se debe indicar un Precio", event)
      break;
    case this.value < 0:
      msgError('precioError', "Se deben ingresar numeros positivos", event)
      break;
    default:
      this.classList.add('is-valid')
      break;
  }
})

inputPrecio.addEventListener('focus', function (event) {
  cleanError('precioError', event)
})

inputDiscount.addEventListener('blur', function (event) {
  switch (true) {
    case !this.value.trim():
      msgError('discountError', "Se debe indicar un descuento", event)
      break;
    case this.value < 0:
      msgError('discountError', "Se permite numeros positivos", event)
      break;
    case this.value > 100:
      msgError('discountError', "Se permite descuento hasta 100", event)
      break;
    default:
      this.classList.add('is-valid')
      break;
  }
})

inputDiscount.addEventListener('focus', function (event) {
  cleanError('discountError', event)
})


selectState.addEventListener('blur', function (event) {
  if (!this.value) {
    msgError('stateError', "Se debe elejir un estado", event)
  } else {
    this.classList.add('is-valid')
  }
})

selectState.addEventListener('focus', function (event) {
  cleanError('stateError', event)
})

selectCategory.addEventListener('blur', function (event) {
  if (!this.value) {
    msgError('categoryError', "Se debe elejir una categoria", event)
  } else {
    this.classList.add('is-valid')
  }
})

selectCategory.addEventListener('focus', function (event) {
  cleanError('categoryError', event)
})

inputDescription.addEventListener('blur', function (event) {
  switch (true) {
    case !this.value.trim():
      msgError('descriptionError', "Se debe ingresar una descripción al producto", event)
      break;
    case this.value.trim().length < 5:
      msgError('descriptionError', "La descripción debe tener mínimo 5 caracteres", event)
      break;
    case this.value.trim().length > 350:
      msgError('descriptionError', "La descripción debe tener máximo 350 caracteres", event)
      break;
    default:
      this.classList.add('is-valid')
      break;
  }
})

let maxCharacters = 350;
let numberCharacters = 350;

inputDescription.addEventListener('focus', function (event) {
  cleanError('descriptionError', event)
})

let textValid;

inputDescription.addEventListener("keyup", function (event) {
  if (textValid && event.key !== 'Backspace') {
    this.value = textValid
    msgError('descriptionError', "Máximo 350 caracteres", event)
    return null
  }
  numberCharacters = maxCharacters - +this.value.length;

  $('numberCharacters').innerHTML = numberCharacters;

  if (numberCharacters === 0) {
    textValid = this.value.trim()
  } else {
    textValid = null
  }

  if (numberCharacters <= 0) {
    $('descriptionInfo').hidden = true;
    msgError('descriptionError', "Máximo 350 caracteres", event)
  } else {
    $('descriptionInfo').hidden = false;
    cleanError('descriptionError', event)
  }

})

const regExExt = /\.(jpg|jpeg|png|gif|webp)$/i;

inputImage.addEventListener('change', function (e) {
  const submitBtnContainer = document.querySelector('.submit-btn--crear');
  const selectedImage = document.getElementById('selectedImage');
  const boxImagePreview = document.getElementById('boxImagePreview');

  $('btnImage').innerText = "Subir imagen";

  if (!regExExt.test(this.value)) {
    $('imageError').innerHTML = "Solo se admiten imágenes jpg | jpeg | png | gif | webp";
    selectedImage.style.display = 'none';
    boxImagePreview.querySelector('.fa-image').style.display = 'inline-block';
    submitBtnContainer.classList.remove('is-valid');
    submitBtnContainer.classList.add('is-invalid');
  } else {
    cleanError('imageError', event);
    $('btnImage').innerText = "Cambiar imagen";
    submitBtnContainer.classList.remove('is-invalid');
    submitBtnContainer.classList.add('is-valid');
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
        selectedImage.style.display = 'inline-block';
        selectedImage.style.marginBottom = '8px';
        selectedImage.style.display = 'inline-block';
        selectedImage.style.height = '180px';
        selectedImage.style.marginTop = '20px';
        selectedImage.style.objectFit = 'contain';
        selectedImage.style.border = '2px solid black';
        selectedImage.style.backgroundColor = 'white';
        boxImagePreview.querySelector('.fa-image').style.display = 'none';
      };
      reader.readAsDataURL(this.files[0]);
    }
  }
});


inputImages.addEventListener('change', function (e) {
  document.getElementById('btnImages').innerText = "Subir imágenes";
  const submitBtnCrear = document.querySelector('.submit-btn--crear2');
  const selectedImagesContainer = document.getElementById('selectedImages');
  const boxImagesPreview = document.getElementById('boxImagesPreview');

  selectedImagesContainer.innerHTML = '';

  switch (true) {
    case Array.from(this.files).some(file => !/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)):
      document.getElementById('imagesError').innerHTML = "Solo se admiten imágenes jpg | jpeg | png | gif | webp";
      boxImagesPreview.querySelector('.fa-image').style.display = 'inline-block';
      selectedImagesContainer.style.display = 'none';
      submitBtnCrear.classList.remove('is-valid');
      submitBtnCrear.classList.add('is-invalid');
      break;
    case this.files.length > 5:
      document.getElementById('imagesError').innerHTML = "Solo se permiten subir hasta 5 imágenes";
      boxImagesPreview.querySelector('.fa-image').style.display = 'inline-block';
      selectedImagesContainer.style.display = 'none';
      submitBtnCrear.classList.remove('is-valid');
      submitBtnCrear.classList.add('is-invalid');
      break;
    default:
      document.getElementById('imagesError').innerHTML = "";
      document.getElementById('btnImages').innerText = "Cambiar imágenes";
      boxImagesPreview.querySelector('.fa-image').style.display = 'none';
      submitBtnCrear.classList.remove('is-invalid');
      submitBtnCrear.classList.add('is-valid');
      selectedImagesContainer.style.display = 'flex';
      selectedImagesContainer.style.justifyContent = 'center';
      selectedImagesContainer.style.gap = '5px';

      Array.from(this.files).slice(0, 5).forEach(file => {
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const image = document.createElement('img');
            image.src = e.target.result;
            image.classList.add('custom-image-class2');
            selectedImagesContainer.appendChild(image);
          };
          reader.readAsDataURL(file);
        }
      });
      break;
  }
});

formAddProduct.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputName = $('name');
  const inputPrecio = $('price');
  const inputDiscount = $('discount');
  const selectState = $('category');
  const selectCategory = $('subCategory');
  const inputDescription = $('description');
  const inputImage = $('image');
  const inputImages = $('images');

  let errors = [];

  if (inputName.value.trim() === '') {
    errors.push('Debe ingresar el nombre del producto');
  } else if(inputName.value.trim().length < 5){
    errors.push('El nombre debe tener como minimo 5 carecteres');
  } else if(inputName.value.trim().length > 50){
    errors.push('El nombre debe tener como maximo 50 carecteres');
  }

  if (inputPrecio.value.trim() === '') {
    errors.push('Debe ingresar el precio del producto');
  } else if (inputPrecio.value < 0) {
    errors.push('Debe ingresar números positivos');
  }

  if (inputDiscount.value.trim() === '') {
    errors.push('Debe ingresar el descuento del producto');
  } else if (inputDiscount.value < 0) {
    errors.push('Debe ingresar números positivos');
  } else if (inputDiscount.value > 100) {
    errors.push('El descuento no puede superar los 100');
  }

  if (selectState.value.trim() === '') {
    errors.push('Debe seleccionar un estado');
  }

  if (selectCategory.value.trim() === '') {
    errors.push('Debe seleccionar una categoría');
  }

  if (inputDescription.value.trim() === '') {
    errors.push('Debe ingresar una descripción');
  } else if(inputDescription.value.trim().length < 5){
    errors.push('La descripción debe tener como minimo 5 carecteres');
  } else if(inputDescription.value.trim().length > 350){
    errors.push('La descripción debe tener como maximo 350 carecteres');
  }

  if (inputImage.value.trim() === '') {
    errors.push('Debe ingresar una imagen');
  }

  if (inputImages.files.length === 0) {
    errors.push('Debe ingresar como mínimo una imagen');
  } else if (inputImages.files.length > 5) {
    errors.push('Solo se permiten 5 imágenes');
  }

  if (errors.length > 0) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Datos inválidos',
      html: errors.join('<br>'),
      showConfirmButton: true,
    });
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto creado con éxito',
      showConfirmButton: true,
    }).then(() => {
      this.submit();
    });
  }
});




