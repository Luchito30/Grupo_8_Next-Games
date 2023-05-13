const $ = (id) => document.getElementById(id);

const emailUserInput = $("username");
const passwordInput = $("password");
const errorUserEmail = $("errorUserEmail");
const errorPass = $("errorPass");
const errorFormLogin = $("errorFormLogin");

const showErrorMessage = (element, message) => {
  element.innerHTML = message;
};

const hideErrorMessage = (element) => {
  element.innerHTML = "";
};

const validateEmail = () => {
  const value = emailUserInput.value.trim();
  if (!value) {
    showErrorMessage(errorUserEmail, "El usuario o email es obligatorio");
    emailUserInput.classList.remove("is-valid");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else if (!/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/.test(value) && !/^[A-Za-z0-9]+$/.test(value)) {
    showErrorMessage(errorUserEmail, "Tiene que ser un usuario o email válido");
    emailUserInput.classList.remove("is-valid");
    emailUserInput.classList.add("is-invalid");
    return false;
  } else {
    hideErrorMessage(errorUserEmail);
    emailUserInput.classList.remove("is-invalid");
    emailUserInput.classList.add("is-valid");
    return true;
  }
};

const validatePassword = () => {
  const value = passwordInput.value.trim();
  if (!value) {
    showErrorMessage(errorPass, "La contraseña es obligatoria");
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
    return false;
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(value)) {
    showErrorMessage(
      errorPass,
      "Debe tener entre 6 y 12 caracteres, al menos una mayúscula, una minúscula y un número"
    );
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
    return false;
  } else {
    hideErrorMessage(errorPass);
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
    return true;
  }
};

const validateFields = () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  return isEmailValid && isPasswordValid;
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