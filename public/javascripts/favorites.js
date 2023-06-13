const cardsContainer = document.querySelector("#cards-container");
const URL_API_SERVER = "http://localhost:3000/api";

const getFavorites = () => {
  return fetch(`${URL_API_SERVER}/favorites`).then((res) => res.json());
};

const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const paintProducts = ({ products }) => {
  cardsContainer.innerHTML = "";

  if (products.length) {
    products.forEach(({ name, discount, price, id, image }) => {
      const priceWithDiscount = discount
        ? price - (price * discount) / 100
        : price;
      const priceFormatARG = convertFormatPeso(priceWithDiscount);

      const template = `
      <div class="card col-12 col-lg-6 position-relative favorite--card">
      <i class="text-primary p-0 border-0 bg-transparent position-absolute fs-5 fas fa-star" style="top:15px;right:15px;cursor:pointer" onclick="toggleFavorite(${id}, this)"></i>
        <div class="card-body d-flex gap-2 align-items-center justify-content-evenly">
          
              <img class="favorites--img" src="/images/products/${image}" alt="">
          <div class="favorite--descriptionbox">
            <div class="card-name favorite--titulo">
               <h5>${name}</h5>
            </div>
            <p class="card-text text-success fw-bold">${priceFormatARG} ${discount ? `<span class="text-danger mx-3">${discount}% OFF</span>` : ""}</p>
            <p class="d-flex align-items-center gap-2">
              <a href="/products/detalle-producto/${id}" class="btn btn-outline favorite--boton">Ver más</a>
              <button class="btn btn-success" onclick="addProductToCart(${id})">Agregar Carrito</button>
            </p>
          </div>
        </div>
      </div>
      `;

      cardsContainer.innerHTML += template;
    });
    return;
  }
  cardsContainer.innerHTML = "<h1>No existen productos favoritos</h1>";
};

window.addEventListener("load", async () => {
  try {
    const { ok, data } = await getFavorites();
    ok && paintProducts({ products: data });
  } catch (error) {
    console.log(error);
  }
});

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

const toggleFavorite = async (id, element) => {
  try {
   
    if (element.classList.contains("fas")) {
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
  }).then((res) =>  res.json());

  if (!isRemove) {
    element.classList.add("fas");
    element.classList.remove("far");
  } else {
    element.classList.add("far");
    element.classList.remove("fas");
      // Remover el elemento de la lista de favoritos
      const card = element.closest(".favorite--card");
      if (card) {
        card.remove();
      }
  }
} catch (error) {
  console.log(error);
}
};