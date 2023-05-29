document.getElementById('form__enviar').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const regExEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    const email = document.getElementById('email');

    let errors = [];

    if (email.value.trim() === '') {
        errors.push('Debe ingresar su correo electrónico');
      }else if (!regExEmail.test(email.value.trim())) {
      errors.push('Debe ingresar un email valido');
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
          title: 'Suscripcion enviada con éxito',
          showConfirmButton: true,
        }).then(() => {
          this.submit();
        });
      }

    })