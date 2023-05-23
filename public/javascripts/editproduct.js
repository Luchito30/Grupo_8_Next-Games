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
    case this.value.trim().length > 80:
      msgError('nameError', "El titulo debe tener maximo 80 caracteres", event)
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

  // Limpiar el contenedor de imágenes antes de agregar las nuevas imágenes
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

function resetFormState() {
    const errorElements = formAddProduct.querySelectorAll('.is-invalid');
    errorElements.forEach(element => {
      element.classList.remove('is-invalid');
    });
}

    formAddProduct.addEventListener('submit', function(event) {
        event.preventDefault();
        let error = false;
      
        const errorMessages = {
          name: "El nombre del producto es obligatorio",
          price: "Se debe indicar un precio",
          discount: "Se debe indicar un descuento",
          category: "Debe elegir un estado",
          subCategory: "Debe elegir una categoria",
          description: "Se debe ingresar una descripción al producto",
          image: "Debe seleccionar una imagen",
          images: "Debe elegir mínimo 1 imagen",
        };
      
        const fields = this.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
          const fieldId = field.id;
          if (!field.value || field.classList.contains('is-invalid')) {
            error = true;
      
            const errorElement = document.getElementById(`${fieldId}Error`);
            if (errorElement) {
              errorElement.innerHTML = errorMessages[fieldId] || "";
            }
      
            field.classList.add('is-invalid');
          }
        });
      
        const submitBtnContainer = document.querySelector('.submit-btn--crear');
        submitBtnContainer.classList.add('is-invalid');
      
        const priceField = document.getElementById('price');
        if (!priceField.value) {
          error = true;
          const priceErrorElement = document.getElementById('precioError');
          if (priceErrorElement) {
            priceErrorElement.innerHTML = errorMessages.price;
          }
          priceField.classList.add('is-invalid');
        }
      
        const categoryField = document.getElementById('category');
        if (!categoryField.value) {
          error = true;
          const categoryErrorElement = document.getElementById('stateError');
          if (categoryErrorElement) {
            categoryErrorElement.innerHTML = errorMessages.category;
          }
          categoryField.classList.add('is-invalid');
        }
      
        const subCategoryField = document.getElementById('subCategory');
        if (!subCategoryField.value) {
          error = true;
          const subCategoryErrorElement = document.getElementById('categoryError');
          if (subCategoryErrorElement) {
            subCategoryErrorElement.innerHTML = errorMessages.subCategory;
          }
          subCategoryField.classList.add('is-invalid');
        }
      
        const imagesField = document.getElementById('images');
        const existingImages = imagesField.getAttribute('data-existing-images') || '';
      
        if (imagesField.files.length > 0) {
          imagesField.classList.remove('is-invalid');
          const imagesErrorElement = document.getElementById('imagesError');
          if (imagesErrorElement) {
            imagesErrorElement.innerHTML = "";
          }
        } else if (existingImages.trim().length === 0) {
          error = true;
          const imagesErrorElement = document.getElementById('imagesError');
          if (imagesErrorElement) {
            imagesErrorElement.innerHTML = errorMessages.images;
          }
          const submitBtnContainer2 = document.querySelector('.submit-btn--crear2');
          submitBtnContainer2.classList.add('is-invalid');
        }
      
        if (error) {
          const formErrorElement = document.getElementById('formError');
          if (formErrorElement) {
            formErrorElement.innerHTML = "Los campos señalados son obligatorios.";
          }
          resetFormState();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Acción realizada con éxito',
            showConfirmButton: false,
            timer: 1500
          });
          resetFormState();
          formAddProduct.submit();
        }
      });