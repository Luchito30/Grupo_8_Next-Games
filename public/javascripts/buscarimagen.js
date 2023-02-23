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

