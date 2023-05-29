// const $ = (el) => document.querySelector(el)
// const btnPrev = $('#btn-prev');
// const btnNext = $('#btn-next');
// const containerItemsPage= $('#container-items-page');
// const containerCoursesCard= $('#container-products-card');

// const apiGetCourses = "http://localhost:3000/api/products";

// const getCourses = ({page=1}= {}) =>{
//     return  fetch(`${apiGetCourses}?page=${page}`).then((res) =>res.json());
// };
// const paintProducts = (products) =>{
//     containerCoursesCard.innerHTML = "";
//     products.forEach(({id,images,name,price,newer}) => {
//        const imgPrimary = images.find(({primary})=>true);
//        const template = `
//        <article class="home__main__section__article" id="oferta">
//            <img class="home__main--img" src="/images/products/{{ image }}" alt="imagen">
//            <div class="home__main--div">
//                {{#if state.name === "in-sale" }}
//                <img src="/images/p-oferta.png" alt="oferta">
//                {{/if}}
//                {{#if state.name === "newer" }}
//                <img src="/images/p-nuevo.png" alt="nuevo">
//                {{/if}}
//                <div class="home__main--flex">
//                    <div class="card__precio">
//                        <p class="home__main--descuento">
//                            {{if discount }}
//                                <h2 class="home__main__preciototal">${{ toThousand(Math.round(price - (price * discount) / 100)) }}</h2>
//                                <span class="card__descuento">{{ discount }}% OFF</span>
//                            {{else}}
//                                <h2 class="home__main__preciototal">${{ toThousand(Math.round(price)) }}</h2>
//                            {{/if}}
//                        </p>
//                    </div>
//                </div>
//                <div class="home__main--ocultar">
//                <h5 class="home__main--descripcion">${{ name} }</h5>
//                <div class="home__main--producto">
//                    <a href="/products/detalle-producto/{{ id }}">
//                        <button>Ver Detalle</button>
//                    </a>
//                </div>
//            </div>
//        </div>
//    </article>
//    `;

// containerCoursesCard.innerHTML += template;
//   });
//  }
//  const paintItemsPage = ({numberPages,itemActive})=>{
//     containerItemsPage.innerHTML = ''
//     for (let i = 1; i <= numberPages; i++) {
//         containerItemsPage.innerHTML +=`
//         <li class="page-item ${
//           itemActive === i && "active"
//         }"><button class="page-link" onclick="getPage(${i})">${i}</button></li>
//         `;

//     }
//  }
//  window.addEventListener("load",async() =>{
//     try {
//         const{
//     data:{count,pages,currentPage,products},

//         } = await getCourses();
//         paintProducts(products)
//         paintItemsPage({numberPages:pages,itemActive:currentPage})

//     } catch (error) {

//     }
//  })
