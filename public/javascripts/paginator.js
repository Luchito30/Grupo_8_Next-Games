const $ = (el) => document.querySelector(el)
const btnPrev = $('#btn-prev');
const btnNext = $('#btn-next');
const selectLimit = $("#select-limit");
const containerItemsPage = $("#container-items-page");
const containerProductCard = $('#container-products-card');

const URL_API_SERVER = "http://localhost:3000/api";

let pageActive = 1;
const apiGetProduct = "http://localhost:3000/api/products";

const getProduct = ({ page = 1, limit = 6 } = {}) =>
    fetch(`${apiGetProduct}?page=${page}&limit=${limit}`).then((res) =>
    res.json()
  );

  const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const paintProducts = (products) => {
    containerProductCard.innerHTML = "";
    products.forEach(({ id, image, name, price, discount,stateId  }) => {
        const priceWithDiscount = discount
          ? price - (price * discount) / 100
          : price;
        const inSale =  "in-sale" ? `<img src="/images/p-oferta.png" alt="oferta">` : ""
        const newer =  "newer" ? `<img src="/images/p-nuevo.png" alt="oferta">` : ""
        const priceFormatARG = convertFormatPeso(priceWithDiscount);
        const template = `
       <article class="home__main__section__article" id="oferta">
           <img class="home__main--img" src="/images/products/${image} " alt="imagen">
           <div class="home__main--div">
           ${stateId === 1 ? "" : `<img src="/images/${stateId === 3 ? "p-oferta.png" : stateId === 2 ? "p-nuevo.png" : ""}" alt="oferta">` }
          
               <div class="home__main--flex">
                   <div class="card__precio">
                       <p class="home__main--descuento">
                        <h2 class="home__main__preciototal">${priceFormatARG}${discount ?  `<span class="card__descuento">${discount}%</span>`: "" } </h2> 
                        </p >
                   </div >
               </div >
            <div class="home__main--ocultar">
                <h5 class="home__main--descripcion">${ name }</h5>
                <div class="d-flex flex-column align-items-center gap-2 home__main--producto">
                  <div>
                    <a href="/products/detalle-producto/${id} "><button>Ver Detalle</button></a>
                  </div>
                  <div>
                    <button class="btn btn-success" onclick="addProductToCart(${id})">Agregar a carrito</button>
                  </div>
                </div>
            </div>
            <i class="text-primary p-0 border-0 bg-transparent position-absolute fs-5 far fa-star" style="top:30px;right:6px;cursor:pointer" onclick="toggleFavorite(${id})"></i>
       </div >
       
   </article >
            `;

            containerProductCard.innerHTML += template;
  });
 }

 const getPage = async (page) => {
    pageActive = page;
    const { data } = await getProduct({ page, limit: selectLimit.value });
    visualImpact(data);
  };

 const paintItemsPage = ({ numberPages, itemActive }) => {
    containerItemsPage.innerHTML = "";
    for (let i = 1; i <= numberPages; i++) {
      containerItemsPage.innerHTML += `
      <li class="page-item ${
        itemActive === i && "active"
      }"><button class="page-link" onclick="getPage(${i})">${i}</button></li>
      `;
    }
  };

  const statusPrevAndNext = ({ currentPage, pages }) => {
    if (currentPage === pages) {
      btnNext.hidden = true;
    } else {
      btnNext.hidden = false;
    }
  
    if (currentPage === 1) {
      btnPrev.hidden = true;
    } else {
      btnPrev.hidden = false;
    }
  };
  
  const visualImpact = async ({ pages, currentPage, products }) => {
    paintProducts(products);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  };

  window.addEventListener("load", async () => {
    try {
      const { data } = await getProduct();
      visualImpact(data);
  
      const limitsValid = [6, 9, 12, 20];
  
      limitsValid.forEach((limitValid) => {
        selectLimit.innerHTML += `
         <option value="${limitValid}">${limitValid} Productos</option>
      `;
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  const handleEventPrevNext = (btnElement, { isNext = false } = {}) => {
    btnElement.addEventListener("click", async () => {
      try {
        const { data } = await getProduct({
          page: isNext ? ++pageActive : --pageActive,
          limit: selectLimit.value,
        });
        visualImpact(data);
      } catch (error) {
        console.log(error);
      }
    });
  };
  
  handleEventPrevNext(btnNext, { isNext: true });
  handleEventPrevNext(btnPrev);
  
  selectLimit.addEventListener("change", async ({ target }) => {
    const { data } = await getProduct({ page: pageActive, limit: target.value });
    visualImpact(data);
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

  const toggleFavorite = async (id) => {
    try {
      const objProductId = {
          productId: id,
        };
        const { ok } = await fetch(`${URL_API_SERVER}/favorites/toggle`, {
          method: "POST",
          body: JSON.stringify(objProductId),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
  
        if (ok) {
          const { ok, data } = await getFavorites();
          console.log({ ok, data })
          paintProducts({ products: data });
        }
  
    } catch (error) {
      console.log(error);
    }
  };