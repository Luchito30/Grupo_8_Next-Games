const userId = document.body.getAttribute("data-userId");
const URL_API_SERVER = "http://localhost:3000/api";

const toggleFavorite = async (id, { target }) => {
  try {
    if (!userId) {
      await Swal.fire({
        title: "Debes Iniciar Sesión",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
      location.href = "/users/login";
      return;
    }

    if (target.classList.contains("fas")) {
      const result = await Swal.fire({
        title: "¿Quieres quitar el producto de favoritos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ff1010",
        cancelButtonColor: '#3005df',
        cancelButtonText: "Cancelar",
        confirmButtonText: "Quitar",
      });
      if(!result.isConfirmed){
        return
      }
    }

    const objProductId = {
        productId: id,
      };
     const {
    ok,
    data: { isRemove },
  } = await fetch(`${URL_API_SERVER}/favorites/toggle`, {
    method: "POST",
    body: JSON.stringify(objProductId),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (!isRemove) {
    target.classList.add("fas");
    target.classList.remove("far");
  } else {
    target.classList.add("far");
    target.classList.remove("fas");
  }
} catch (error) {
  console.log(error);
}
}

const addProductToCart = async (id) => {
    try {
      const objProductId = {
        productId: id,
      };
      const { ok } = await fetch(`${URL_API_SERVER}/cart/addProduct`, {
        method: "POST",
        body: JSON.stringify(objProductId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
  
      await Swal.fire({
        title: ok ? "Producto agregado al carrito" : "Debes iniciar sesión",
        icon: ok ? "success" : "warning",
        showConfirmButton: false,
        timer: 1200,
      });
  
      !ok && (location.href = "/users/login");
    } catch (error) {
      console.log(error);
    }
  };
  ;