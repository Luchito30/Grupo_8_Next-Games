const btnAddCart = document.querySelector('#btn-addCart')
const quantityElement = document.querySelector('#cantidad-carrito');
const btnLessProduct = document.querySelector('#btn-lessProduct');
const btnMoreProduct = document.querySelector('#btn-moreProduct');
const cuotasSelect = document.querySelector('#cuotas');
const precioElement = document.querySelector('.detalle__precio--descuento');
const precioSinCambioElement = document.querySelector('.detalle__precio--sincambio');
const URL_API_SERVER = "http://localhost:3000/api";


btnAddCart.addEventListener('click',async () => {
  const id = btnAddCart.getAttribute('data-id')
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
})

btnAddCart.addEventListener('click', async () => {
  const cuotas = cuotasSelect.value;
  const productId = document.querySelector('.tarjetas-detalle').dataset.id;
  try {
    await fetch(`${URL_API_SERVER}/cart/cuotas`, {
      method: 'POST',
      body: JSON.stringify({ productId, cuotas }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
});

btnLessProduct.addEventListener('click', async (event) => {
  const id = event.target.getAttribute('data-lessProduct');
  const quantityElement = document.querySelector(`#cantidad-carrito${id}`);
  let quantity = parseInt(quantityElement.textContent.trim());
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity.toString();

    try {
      const objProductId = {
        productId: id
      };
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
    } catch (error) {
      console.log(error);
    }
  }
});

btnMoreProduct.addEventListener('click', async (event) => {
  const id = event.target.getAttribute('data-moreProduct');
  const quantityElement = document.querySelector(`#cantidad-carrito${id}`);

  let quantity = parseInt(quantityElement.textContent.trim());
  quantity++;
  quantityElement.textContent = quantity.toString();

  try {
    const objProductId = {
      productId: id
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
  } catch (error) {
    console.log(error);
  }
});

const tarjetasDetalle = document.querySelector('.tarjetas-detalle');
const price = parseFloat(tarjetasDetalle.dataset.price);
const discount = parseFloat(tarjetasDetalle.dataset.discount);

function getCuotaPrice(cuotaValue, price, discount) {
  if (discount) {
    const priceWithDiscount = price - (price * discount) / 100;
    switch (cuotaValue) {
      case '1 pago':
        return `$${toThousand(Math.round(priceWithDiscount))}`;
      case '3 pago':
        return `3 cuotas de $${toThousand(Math.round(priceWithDiscount / 3))}`;
      case '6 pago':
        return `6 cuotas de $${toThousand(Math.round(priceWithDiscount / 6))}`;
      case '9 pago':
        return `9 cuotas de $${toThousand(Math.round(priceWithDiscount / 9))}`;
      case '12 pago':
        return `12 cuotas de $${toThousand(Math.round(priceWithDiscount / 12))}`;
      default:
        return '';
    }
  } else {
    switch (cuotaValue) {
      case '1 pago':
        return `$${Math.round(price).toFixed(2)}`;
      case '3 pago':
        return `3 cuotas de $${toThousand(Math.round(price / 3))}`;
      case '6 pago':
        return `6 cuotas de $${toThousand(Math.round(price / 6))}`;
      case '9 pago':
        return `9 cuotas de $${toThousand(Math.round(price / 9))}`;
      case '12 pago':
        return `12 cuotas de $${toThousand(Math.round(price / 12))}`;
      default:
        return '';
    }
  }
}

cuotasSelect.addEventListener('change', () => {
  const cuotaValue = cuotasSelect.value;
  const cuotaPrice = getCuotaPrice(cuotaValue, price, discount);

  if (precioElement) {
    if (cuotaPrice !== '') {
      precioElement.textContent = cuotaPrice;
    } else {
      precioElement.textContent = 'Sin descuento';
    }
  } else if (precioSinCambioElement) {
    if (cuotaPrice !== '') {
      precioSinCambioElement.textContent = cuotaPrice;
    } else {
      precioSinCambioElement.textContent = 'Sin descuento';
    }
  }
});

function toThousand(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}