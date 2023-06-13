const URL_API_SERVER = "https://nextgames.onrender.com/api";
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
  