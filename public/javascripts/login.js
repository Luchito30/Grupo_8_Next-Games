const $ = (id) => document.getElementById(id);

const emailUserInput = $("username");
const passwordInput = $("password");
const errorUserEmail = $("errorUserEmail");
const errorPass = $("errorPass");
const errorFormLogin = $("errorFormLogin");

const showErrorMessage = (element, message) => {
  element.innerHTML = message;
};

const showRecaptchaErrorMessage = (message) => {
  const errorFormLogin = $("errorFormLogin");
  errorFormLogin.innerHTML = message;
  errorFormLogin.classList.add("text");
};

const hideErrorMessage = (element) => {
  element.innerHTML = "";
};

const validateRecaptcha = () => {
  const response = grecaptcha.getResponse();
  if (!response) {
    showRecaptchaErrorMessage("Completa el reCAPTCHA");
    return false;
  } else {
    const errorFormLogin = $("errorFormLogin");
    errorFormLogin.innerHTML = "";
    errorFormLogin.classList.remove("text");
    return true;
  }
};

const validateEmail = () => {
  const value = emailUserInput.value.trim();
  if (!value) {
    showErrorMessage(errorUserEmail, "El usuario o email es obligatorio");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else if (value.length < 2) {
    showErrorMessage(errorUserEmail, "Minimo 2 caracteres");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else if (value.length > 50) {
    showErrorMessage(errorUserEmail, "Maximo 50 caracteres");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else if (!/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/.test(value) && !/^[A-Za-z0-9]+$/.test(value)) {
    showErrorMessage(errorUserEmail, "Tiene que ser un usuario o email válido");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else {
    hideErrorMessage(errorUserEmail);
    emailUserInput.classList.remove("is-invalid");
    return true;
  }
};

const validatePassword = () => {
  const value = passwordInput.value.trim();
  if (!value) {
    showErrorMessage(errorPass, "La contraseña es obligatoria");
    passwordInput.classList.add("is-invalid");
    return false;
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(value)) {
    showErrorMessage(
      errorPass,
      "Debe tener entre 6 y 12 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial ($@!%*?&_-)"
    );
    passwordInput.classList.add("is-invalid");
    return false;
  } else {
    hideErrorMessage(errorPass);
    passwordInput.classList.remove("is-invalid");
    return true;
  }
};

const validateFields = () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isRecaptchaValid = validateRecaptcha();
  return isEmailValid && isPasswordValid && isRecaptchaValid;
};


$("username").addEventListener("input", validateEmail);
$("username").addEventListener("focus", () => hideErrorMessage(errorUserEmail));
$("password").addEventListener("input", validatePassword);
$("password").addEventListener("focus", () => hideErrorMessage(errorPass));

$("formLogin").addEventListener("submit", (event) => {
  event.preventDefault();
  const isFormValid = validateFields();
  if (isFormValid) {
    $("formLogin").submit();
  }
});

function mostrarContrasena(){
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";  }
}