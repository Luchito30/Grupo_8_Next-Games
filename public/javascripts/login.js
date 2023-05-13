const $ = (id) => document.getElementById(id)

const emailInput = document.getElementById("username")

const msgError = (element, message, {target}) => {
    $(element).innerHTML = message
    target.classList.add('errorInput')
}

const cleanError = (element, {target}) => {
    target.classList.remove('errorInput')
    target.classList.remove('validInput')
    $(element).innerHTML = null
}

const checkedFields = () =>{
    const elements = $("formLogin").elements;
    $("errorFormLogin").innerHTML = null;

    for (let i = 0; i < elements.length -2; i++) {
        if(elements[i].classList.contains("errorInput")){
            $("errorFormLogin").innerHTML = "Hay campos con errores o están vacios"
        }
        
    }

};
let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;

 /**
  input email

  */ 
  

 $('username').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorEmail', "El usuario o email es obligatorio", e);
            break;
        case !regExEmail.test(this.value.trim()) && !/^[A-Za-z0-9]+$/.test(this.value.trim()):
            msgError('errorEmail', "Tiene que ser un usuario o email válido", e);
            break;
        default:
            this.classList.add('validInput');
            checkedFields();

            

            break;
    }
});



 

 
  $('username').addEventListener('focus', function(e){
    cleanError('errorEmail', e)
  })

  $('password').addEventListener('blur', async function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorPass', "la contraseña es obligatoria", e)
            break;

        case !regExPass.test(this.value.trim()):
            msgError('errorPass', "Debe ser entre 6 y 12 caracteres y tener una mayúscula, minúscula y un número",e)
        break
        case await verifyPass(emailInput.value.trim(),this.value.trim()) :
          msgError('errorPass', "Credenciales inválidas", e)
          
        break
    
        default:
            this.classList.add('validInput')
            checkedFields();
            break;
    }
  });

  $('password').addEventListener('focus',function(e){
    cleanError('errorPass', e)
  })

//   $('formLogin').addEventListener('submit', function(e){
//     e.preventDefault();

//     let error = false

//     for (let i = 0; i < this.elements.length -1; i++) {
        
//         if(!this.elements[i].value.trim() || this.elements[i].classList.contains('errorInput')) {
//             error = true
//             this.elements[i].classList.add('errorInput')
//             $('errorFormLogin').innerHTML = "¡Hay campos vacíos o con errores!"
//         }
        
//     }

//     !error && this.submit()

//   })





















function mostrarContrasena(){
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";  }
}