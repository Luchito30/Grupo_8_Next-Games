const files = document.querySelectorAll(".submit-btn--crear__buscar")
Array.from(files).forEach(
    f => {
        f.addEventListener("change", e => {
            const span = document.querySelector(".submit-btn--crea__nombrearchi > span"); 
            if( f.files.length == 0){
                span.innerHTML = "Subir imagen";
            }else{
            span.innerHTML = f.files[0].name;
        }

        
        });
    }
);

const files2 = document.querySelectorAll(".submit-btn--crear__buscar2")
Array.from(files2).forEach(
    f => {
        f.addEventListener("change", e => {
            const span = document.querySelector(".submit-btn--crea__nombrearchi2 > span"); 
            if( f.files.length == 0){
                span.innerHTML = "Subir imagen";
            }else if(f.files.length == 1){
            span.innerHTML = f.files[0].name;
            }
            else{
            span.innerHTML = f.files.length + " Imagenes Seleccionadas";
        }

        
        });
    }
);

const files3 = document.querySelectorAll(".submit-btn--crear__buscar3")
Array.from(files).forEach(
    f => {
        f.addEventListener("change", e => {
            const span = document.querySelector(".submit-btn--crea__nombrearchi3 > span"); 
            if( f.files.length == 0){
                span.innerHTML = f.files[0].name;
            }
        });
    }
);