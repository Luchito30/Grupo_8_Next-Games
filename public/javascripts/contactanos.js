const $ = (id) => document.getElementById(id);
const regExEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let maxCharacters = 350;
let numberCharacters = 350;

$('description').addEventListener('focus', function (event) {
    cleanError('descriptionError', event)
})

let textValid;

$('description').addEventListener("keyup", function (event) {
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

document.getElementById('formContacto').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const name = document.getElementById('name');
    const emails = document.getElementById('emails');
    const tel = document.getElementById('tel');
    const province = document.getElementById('province');
    const municipio = document.getElementById('municipio');
    const localidad = document.getElementById('localidad');
    const asunto = document.getElementById('asunto');
    const description = document.getElementById('description');
  
    let errors = [];
  
    if (name.value.trim() === '') {
      errors.push('Debe ingresar su nombre');
    }
  
    if (emails.value.trim() === '') {
      errors.push('Debe ingresar su correo electrónico');
    }else if (!regExEmail.test(emails.value.trim())) {
    errors.push('Debe ingresar un email valido');
    }
  
    if (tel.value.trim() === '') {
      errors.push('Debe ingresar su número de teléfono');
    }
  
    if (province.value.trim() === '') {
      errors.push('Debe seleccionar su provincia');
    }
  
    if (municipio.value.trim() === '') {
      errors.push('Debe seleccionar su municipio');
    }
  
    if (localidad.value.trim() === '') {
      errors.push('Debe seleccionar su localidad');
    }
  
    if (asunto.value.trim() === '') {
      errors.push('Debe ingresar el asunto de la consulta');
    }
  
    if (description.value.trim() === '') {
      errors.push('Debe ingresar su consulta');
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
        title: 'Consulta creada con éxito',
        showConfirmButton: true,
      }).then(() => {
        this.submit();
      });
    }
  });
  