const $ = (el) => document.querySelector(el);
const cardsContainer = $("#cards-container");
const clearCart = $("#clear-cart");
const btnBuy = $("#btn-buy");
const outputTotal = $("#output-total");
const cuotasList = $("#cuotas-container")
const URL_API_SERVER = "https://nextgames.onrender.com/api";

const getOrder = () => {
  return fetch(`${URL_API_SERVER}/cart/getOrderPending`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const paintProducts = ({ products }) => {
  cardsContainer.innerHTML = "";
  if (products.length) {
    products.forEach(
      ({ name,image, Cart, id, price, discount }) => {
        const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const priceWithDiscount = discount
          ? toThousand(Math.round(price - (price * discount) / 100))
          : toThousand(Math.round(price));
        const priceFormatARG = convertFormatPeso(priceWithDiscount);
        const template = `
              <!-- COURSE TEMPLATE CARD -->
              <div class="card col-12 col-lg-8 my-5" id="body-carrito">
                <div class="card-body row" >
                  
                  <img class="col-4" id="image-carrito" style="width:150px" style="object-fit: contain;" src="/images/products/${
                    image
                  }" alt="">
                  <div class="col-8 position-relative">
                  <button onclick="removeProductToCart(${id})" class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger "id="remove-product-icon-carrito" style=""><i style="padding:2px; width=10px;" class="rounded-circle btn-clear far fa-times-circle"></i></button>
    
                    <h5 class="card-name" id="name-carrito">${name}</h5>
                    
                    <p class="card-text" id="precio-carrito">$ ${priceFormatARG}${
          discount
            ? `<span class="text-danger mx-3">${discount}%</span>`
            : ""
        }</p>
                    <p class="d-flex align-items-center gap-2">
                    <label for=""></label>
                      <button id="less-cantidad" onclick="lessProduct(${id} ,${
          Cart.quantity
        })" class="btn btn-light">-</button>
                      <output style="width:50px"  class="form-control text-center" id="cantidad-carrito">
                        ${Cart.quantity}
                      </output>
                      <button id="more-cantidad" onclick="moreProduct(${id})" class="btn btn-light">+</button>
                      <a href="/products/detalle-producto/${id}" class="btn btn-outline-dark" id="ver-mas-carrito">Ver más</a>
                      <div>
                      <h3 class="metodos">metodos de pago:</h3>
                    </div>
                    ${ discount ? 
                     `<div class="detalle__select--pagos">
                        <select class="detalle__select--pagos-op" name="cuotas" id="cuotas">
                        <option value="1">1 pago de $${toThousand(
                          Math.round(price - (price * discount) / 100) * Cart.quantity
                        )}</option>
                         <option value="3">3 pagos de $${toThousand(
                          Math.round((price - (price * discount) / 100) / 3) * Cart.quantity
                        )}</option>
                         <option value="6">6 pagos de $${toThousand(
                          Math.round((price - (price * discount) / 100) / 6) * Cart.quantity
                        )}</option>
                         <option value="9">9 pagos de $${toThousand(
                          Math.round((price - (price * discount) / 100) / 9) * Cart.quantity
                        )}</option>
                         <option value="12">12 pagos de $${toThousand(
                          Math.round((price - (price * discount) / 100) / 12) * Cart.quantity
                        )}</option>
                        </select>
                      </div>` :
            
                     `<div class="detalle__select--pagos">
                        <select class="detalle__select--pagos-op" name="cuotas" id="cuotas">
                        <option value="1">1 pago de $${toThousand(
                          Math.round(price) * Cart.quantity
                        )}</option>
                         <option value="3">3 pagos de $${toThousand(
                          Math.round(price / 3) * Cart.quantity
                        )}</option>
                         <option value="6">6 pagos de $${toThousand(
                          Math.round(price / 6) * Cart.quantity
                        )}</option>
                         <option value="9">9 pagos de $${toThousand(
                          Math.round(price / 9) * Cart.quantity
                        )}</option>
                         <option value="12">12 pagos de $${toThousand(
                          Math.round(price / 12) * Cart.quantity
                        )}</option>
                        </select>
                      </div>`
                    } 
                      </p>
                  </div>
               
                </div>
              </div>
      `;
        cardsContainer.innerHTML += template;
      }
    );
    return;
  }
  cardsContainer.innerHTML = "<h1>No existen productos en el carrito</h1>";
};

const paintTotal = (n) => {
  outputTotal.textContent = convertFormatPeso(n);
};

window.addEventListener("load", async () => {
  try {
    const { ok, data } = await getOrder();
    if (ok) {
      paintProducts({ products: data.cart });
      paintTotal(data.total);
    }

    console.log({ ok, data });
  } catch (error) {
    console.log(error);
  }
});

const moreProduct = async (id) => {
  const objProductId = {
    productId: id,
  };
  const { ok } = await fetch(`${URL_API_SERVER}/cart/moreQuantity`, {
    method: "PUT",
    body: JSON.stringify(objProductId),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (ok) {
    const { ok, data } = await getOrder();
    if (ok) {
      paintProducts({ products: data.cart });
      paintTotal(data.total);
    }
  }
};

const lessProduct = async (id, quantity) => {
  const objProductId = {
    productId: id,
  };

  if (quantity > 1) {
    const { ok } = await fetch(`${URL_API_SERVER}/cart/lessQuantity`, {
      method: "PUT",
      body: JSON.stringify(objProductId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (ok) {
      const { ok, data } = await getOrder();
      if (ok) {
        paintProducts({ products: data.cart });
        paintTotal(data.total);
      }
    }
  }
};
const removeProductToCart = async (id) => {
  try {
    const result = await Swal.fire({
      title: "¿Estas seguro de quitar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Quitar",
    });

    if (result.isConfirmed) {
      const objProductId = {
        productId: id,
      };
      const { ok } = await fetch(`${URL_API_SERVER}/cart/removeProduct`, {
        method: "DELETE",
        body: JSON.stringify(objProductId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (ok) {
        const { ok, data } = await getOrder();
        if (ok) {
          paintProducts({ products: data.cart });
          paintTotal(data.total);
        }

        Swal.fire({
          title: "Producto eliminado del carrito",
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

clearCart.addEventListener("click", async () => {
  try {
    const result = await Swal.fire({
      title: "¿Estas seguro de borrar todo el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Quitar",
    });

    if (result.isConfirmed) {
      const { ok } = await fetch(`${URL_API_SERVER}/cart/clearCart`, {
        method: "DELETE",
      }).then((res) => res.json());

      if (ok) {
        const { ok, data } = await getOrder();

        if (ok) {
          paintProducts({ products: data.cart });
          paintTotal(data.total);
        }

        Swal.fire({
          title: "Proceso completado",
          icon: "success",
          showConfirmButton: false,
          timer: 1400,
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
});

btnBuy.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "¿Estas seguro realizar la compra?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  });

  if (result.isConfirmed) {
    const { ok } = await fetch(`${URL_API_SERVER}/cart/statusOrder`, {
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    let timerInterval;
    const result = await Swal.fire({
      title: "Procesando la compra",
      text: "Esperar mientras se realiza la compra",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    if (result.dismiss === Swal.DismissReason.timer) {
      
      await Swal.fire({
        title: ok ? "Gracias por su compra" : "Upss hubo error",
        icon: ok ? 'success': 'error',
        showConfirmButton:false,
        timer:1000
      })

      ok && (location.href = "/")

    }
  }
});