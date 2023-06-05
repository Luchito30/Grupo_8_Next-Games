const $ = (el) => document.querySelector(el);
const outputTotal = $("#output-total");
const URL_API_SERVER = "http://localhost:3000/api";

const getOrder = () => {
  return fetch(`${URL_API_SERVER}/cart/getOrderPending`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
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
