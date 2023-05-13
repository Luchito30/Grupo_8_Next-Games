const $ = (id) => document.getElementById(id);

const msgError = (element, message, {target}) => {
    $(element).innerHTML = message
    target.classList.add('errorInput')
}

const cleanError = (element, {target}) => {
    target.classList.remove('errorInput')
    target.classList.remove('validInput')
    $(element).innerHTML = null
}


let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;


  $('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorName',"El nombre es obligatorio",e)
            
            break;
            case this.value.trim().length < 2 || this.value.trim().length > 50 :
                msgError('errorName', "Entre 2 y 50 caracteres",e)
                break
                case !regExLetter.test(this.value.trim()):
                    msgError('errorName', "Solo caracteres alfabeticos",e)
                break 
    
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });
  $('name').addEventListener('focus', function(e) {
    cleanError('errorName', e)
  })

  $('surname').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorSurname', "El apellido es obligatorio", e)
            break;
        case this.value.trim().length < 2 || this.value.trim().length > 50 :
        msgError('errorSurname', "Entre 2 y 50 caracteres",e)
        break
        case !regExLetter.test(this.value.trim()):
            msgError('errorSurname', "Solo caracteres alfabeticos",e)
        break
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });

  $('user').addEventListener('focus', function(e) {
    cleanError('errorUser', e)
  })
  $('user').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorUsername', "El  es obligatorio", e)
            break;
        case this.value.trim().length < 2 || this.value.trim().length > 50 :
        msgError('errorUsernamer', "Entre 2 y 50 caracteres",e)
        break
        case !regExLetter.test(this.value.trim()):
            msgError('errorUsername', "Solo caracteres alfabeticos",e)
        break
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });

  $('user').addEventListener('focus', function(e) {
    cleanError('errorUsername', e)
  })

  
  $('email').addEventListener('blur', async function(e){
    
    switch (true) {
        case !this.value.trim():
            msgError('errorEmail', "El email es obligatorio", e)
            break;
        case !regExEmail.test(this.value.trim()):
            msgError('errorEmail', "Tiene que ser un email válido",e)
        break
        case await verifyEmail(this.value.trim()) :
          msgError('errorEmail', "El email ya se encuentra en uso", e)
          
        break
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });

  $('email').addEventListener('focus', function(e) {
    cleanError('errorEmail', e)
  })


  $('password').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorPass', "la contraseña es obligatoria", e)
            break;

        case !regExPass.test(this.value.trim()):
            msgError('errorPass', "Debe ser entre 6 y 12 caracteres y tener una mayúscula, minúscula y un número",e)
        break
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });

  $('password').addEventListener('focus', function(e) {
    cleanError('errorPass', e);
    $("msgPassword").hidden = false;
  })

  const exRegs = {
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@!%*?&_-]/,
    exRegMin: /.{6,}/,
    exRegMax: /.{13}/,
  };
  
  const validPassword = (element, exReg, value) => {
    if (!exReg.test(value)) {
      $(element).classList.add("text-danger");
    } else {
      $(element).classList.add("text-success");
      $(element).classList.remove("text-danger");
    }
  };
  
  const validMaxPassword = (element, exReg, value) => {
    if (exReg.test(value)) {
      $(element).classList.add("text-danger");
    } else {
      $(element).classList.add("text-success");
      $(element).classList.remove("text-danger");
    }
  };

  $("password").addEventListener("keyup", function () {
    validPassword("mayu", exRegs.exRegMayu, this.value);
    validPassword("minu", exRegs.exRegMinu, this.value);
    validPassword("num", exRegs.exRegNum, this.value);
    validPassword("esp", exRegs.exRegEsp, this.value);
    validPassword("min", exRegs.exRegMin, this.value);
    validMaxPassword("max", exRegs.exRegMax, this.value);
  });

  $('password2').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorPass2', "Confirme la contraseña", e)
            break;

        case this.value.trim() !== $('password').value.trim():
            msgError('errorPass2', "La confirmación no coincide",e)
        break
        default:
            this.classList.add('validInput')
            checkedFields()
            break;
    }
  });

  $('password2').addEventListener('focus', function(e) {
    cleanError('errorPass2', e)
  })




  // $('formRegister').addEventListener('submit', function(e){
  //   e.preventDefault();

  //   let error = false

  //   for (let i = 0; i < this.elements.length -1; i++) {
        
  //       if(!this.elements[i].value.trim() || this.elements[i].classList.contains('errorInput')) {
  //           error = true
  //           this.elements[i].classList.add('errorInput')
  //           $('errorForm').innerHTML = "Hay campos vacíos o con errores!"
  //       }
        
  //   }

  //   !error && this.submit()

  // })
