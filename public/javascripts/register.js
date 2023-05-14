const $ = (id) => document.getElementById(id);

const msgError = (element, message, {target}) => {
    $(element).innerHTML = message
    target.classList.add('is-invalid')
}

const cleanError = (element, {target}) => {
    target.classList.remove('is-invalid')
    target.classList.remove('is-valid')
    $(element).innerHTML = null
}


let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;

  const inputImage = document.getElementById('image');
  const imageError = document.getElementById('imageError');
  const imagePreview = document.getElementById('imagePreview');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  
    inputImage.addEventListener('change', function (event) {
    const regExExt = /\.(jpg|jpeg|png|gif|webp)$/i;
  
    if (!regExExt.test(this.value)) {
      imageError.innerHTML = 'Solo se admiten imágenes jpg | jpeg | png | gif | webp';
      inputImage.classList.remove('is-valid');
      inputImage.classList.add('is-invalid');
      imagePreviewContainer.style.display = 'none';
    } else {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Vista previa de la imagen';
        img.style.position = 'absolute';
        img.style.width = '60%';
        img.style.top = '66px';
        img.style.right = '60px';
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
        imagePreviewContainer.style.display = 'block';
      };
      reader.readAsDataURL(this.files[0]);
  
      imageError.innerHTML = '';
      inputImage.classList.remove('is-invalid');
      inputImage.classList.add('is-valid');
    }
  });
  
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
            this.classList.add('is-valid')
            checkedFields()
            break;
    }
  });
  $('name').addEventListener('focus', function(e) {
    cleanError('errorName', e)
  })

  $('surname').addEventListener('blur', function(e) {
    switch (true) {
      case !this.value.trim():
        msgError('errorSurname', "El apellido es obligatorio", e);
        break;
      case this.value.trim().length < 2 || this.value.trim().length > 50:
        msgError('errorSurname', "Entre 2 y 50 caracteres", e);
        break;
      case !regExLetter.test(this.value.trim()):
        msgError('errorSurname', "Solo caracteres alfabéticos", e);
        break;
      default:
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        checkedFields();
        break;
    }
  });
  
  $('surname').addEventListener('focus', function(e) {
    cleanError('errorSurname', e);
  });
  

  $('user').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorUsername', "El  es obligatorio", e)
            break;
        case this.value.trim().length < 2:
        msgError('errorUsername', "Minimo 2 caracteres",e)
        break
        case this.value.trim().length > 50:
          msgError('errorUsername', "Maximo 50 caracteres",e)
        break
        case !regExLetter.test(this.value.trim()):
            msgError('errorUsername', "Solo caracteres alfabeticos",e)
        break
        default:
            this.classList.add('is-valid')
            checkedFields()
            break;
    }
  });

  $('user').addEventListener('focus', function(e) {
    cleanError('errorUsername', e)
  })

  
  $('email').addEventListener('blur', function(e) {
    const emailInput = this.value.trim();
  
    if (!emailInput) {
      msgError('errorEmail', "El email es obligatorio", e);
      this.classList.add('is-invalid');
    } else if (!regExEmail.test(emailInput)) {
      msgError('errorEmail', "Tiene que ser un email válido", e);
      this.classList.add('is-invalid');
    } else {
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
      checkedFields();
    }
  });
  
  $('email').addEventListener('focus', function(e) {
    cleanError('errorEmail', e);
  });
  
  $('password').addEventListener('blur', function(e){
    switch (true) {
      case !this.value.trim():
        msgError('errorPass', "La contraseña es obligatoria", e);
        break;
      case !regExPass.test(this.value.trim()):
        msgError('errorPass', "Debe tener entre 6 y 12 caracteres y contener al menos una mayúscula, una minúscula y un número", e);
        break;
      default:
        this.classList.add('is-valid');
        this.classList.remove('pass-invalid');
        checkedFields();
        break;
    }
  });
  
  $('password').addEventListener('focus', function(e) {
    cleanError('errorPass', e);
    $("msgPassword").hidden = false;
  });
  
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
      $(element).classList.add("pass-invalid");
    } else {
      $(element).classList.add("pass-valid");
      $(element).classList.remove("pass-invalid");
    }
  };
  
  const validMaxPassword = (element, exReg, value) => {
    if (exReg.test(value)) {
      $(element).classList.remove("pass-valid");
      $(element).classList.add("pass-invalid");
    } else {
      $(element).classList.add("pass-valid");
      $(element).classList.remove("pass-invalid");
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
            this.classList.add('is-valid')
            checkedFields()
            break;
    }
  });

  $('password2').addEventListener('focus', function(e) {
    cleanError('errorPass2', e)
  })

  $('formRegister').addEventListener('submit', function(e) {
    e.preventDefault(); 
  
    if (!validateName()) {
      msgError('errorName', "El nombre es obligatorio", { target: $('name') });
    }
  
    if (!validateSurname()) {
      msgError('errorSurname', "El apellido es obligatorio", { target: $('surname') });
    }
  
    if (!validateUsername()) {
      msgError('errorUsername', "El usuario es obligatorio", { target: $('user') });
    }
  
    if (!validateEmail()) {
      msgError('errorEmail', "El email es obligatorio y debe ser válido", { target: $('email') });
    }
  
    if (!validatePassword()) {
      msgError('errorPass', "La contraseña es obligatoria y debe cumplir los requisitos", { target: $('password') });
    }
  
    if (!validateConfirmPassword()) {
      msgError('errorPass2', "Confirme la contraseña", { target: $('password2') });
    }
  
    if (validateName() && validateSurname() && validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword()) {
      this.submit();
    }
  });
  
  const validateName = () => {
    const name = $('name').value.trim();
    return name.length >= 2 && name.length <= 50 && regExLetter.test(name);
  };
  
  const validateSurname = () => {
    const surname = $('surname').value.trim();
    return surname.length >= 2 && surname.length <= 50 && regExLetter.test(surname);
  };
  
  const validateUsername = () => {
    const username = $('user').value.trim();
    return username.length >= 2 && username.length <= 50 && regExLetter.test(username);
  };
  
  const validateEmail = () => {
    const email = $('email').value.trim();
    return email.length > 0;
  };
  
  const validatePassword = () => {
    const password = $('password').value.trim();
    return password.length > 0 && regExPass.test(password);
  };
  
  const validateConfirmPassword = () => {
    const password = $('password').value.trim();
    const confirmPassword = $('password2').value.trim();
    return confirmPassword.length > 0 && confirmPassword === password;
  };
  
  
  