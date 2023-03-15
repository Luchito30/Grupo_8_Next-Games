const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  
    index: (req, res) => {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

      return res.render('products',{
      title: "Next Games | Productos",
      products,
      toThousand
  })
},
    carrito: (req, res) => {
      return res.render('productos/carrito',{
        title:"Next Games | Carrito"
      });
    },
    detalleproducto: (req, res) => {
      let product= products.find(product => product.id === +req.params.id);
      return res.render('productos/detalle-producto', {
        title: "Next Games | Detalle de producto",
      ...product,
      toThousand
        });
    }, 
    edicion: (req, res) => {
      const { id } = req.params;
      const product = products.find(product => product.id === +id);
      return res.render('productos/edicion', {
        title: "Next Games | Editar Producto",
      ...product,
      toThousand
      });
  },
  update: (req, res) => {
    const id = +req.params.id
    const product = products.find(product => product.id === +id);
    const { name, discount, price, description, category, subCategory } = req.body;
    const productUpdated = {
        id,
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        subCategory,
        category,
        image:  req.files && req.files.image ? req.files.image[0].filename : product.image,
        images : req.files && req.files.images ? req.files.images.map(file => file.filename) : product.images,
        
    };
    const productsModified = products.map(product => {
        if (product.id === +id) {
            return productUpdated
        }

        return product;
    })
   

    fs.writeFileSync('./data/productDataBase.json', JSON.stringify(productsModified, null, 3), "utf-8");
    return res.redirect("/products")
},
    createItem: (req, res) => {
      return res.render('productos/crear-item',{
        title: "Next Games | Crear Producto"
      });
},
storeMainImage:(req,res) =>{
  const{name,price,description,discount,image,images,category,subCategory}= req.body;
  const newProduct={
    id:products[products.length -1].id +1,
    name:name.trim(),
    description: description.trim(),
    price:+price,
    discount:+discount,
    subCategory,
    category,
    image : req.files && req.files.image ? req.files.image[0].filename : "default-image.png",
    images : req.files && req.files.images ? req.files.images.map(file => file.filename) : [],
  

    
};


products.push(newProduct);

fs.writeFileSync('./data/productDataBase.json', JSON.stringify(products, null,3), 'utf-8')

      return res.redirect('/products')
  },
    removeConfirm : (req,res) => {
      const id = req.params.id;
      const product = products.find(product => product.id === +id);

      return res.render('productos/confirmRemove',{
      ...product,
      title: "Next Games | Advertencia"
    })
  },
    remove : (req,res) => {
      const id = req.params.id;
      const productsModified = products.filter(product => product.id !== +id);


      fs.writeFileSync('./data/productDataBase.json',JSON.stringify(productsModified, null, 3),'utf-8')
      return res.redirect(`/products`)   
  },
  notebook : (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const computacion = products.filter(product => product.subCategory === "Notebooks" )
    return res.render('productos/compu',{
      title: "Next Games | Notebook",
      computacion,
      toThousand
    })
},
accesorios : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const Accesorios = products.filter(product => product.subCategory === "Accesorios" )
  return res.render('productos/accesorios',{
    title: "Next Games | Accesorios",
    Accesorios,
    toThousand
  })
},
consolas : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const consolas = products.filter(product => product.subCategory === "Consolas" )
  return res.render('productos/consolas',{
    title: "Next Games | Consolas",
    consolas,
    toThousand
  })
},
tarjetas : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const tarjetas = products.filter(product => product.subCategory === "Gifts Cards" )
  return res.render('productos/tarjetas',{
    title: "Next Game | Gifts Cards",
    tarjetas,
    toThousand
  })
},
juegos : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const juegos = products.filter(product => product.subCategory === "Juegos" )
  return res.render('productos/juegos',{
    title: "Next Games | Juegos",
    juegos,
    toThousand
  })
},
perifericos : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const perifericos = products.filter(product => product.subCategory === "Perifericos" )
  return res.render('productos/perifericos',{
    title: "Next Games | Perifericos",
    perifericos,
    toThousand
  })
},
ofertas : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const inSale = products.filter(product => product.category === "in-sale" )
  return res.render('productos/insale',{
    title: "Next Games | Ofertas",
    inSale,
    toThousand
  })
},
ingresos : (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const ingresos = products.filter(product => product.category === "newer" )
  return res.render('productos/ingresos',{
    title: "Next Games | Ingresos",
    ingresos,
    toThousand
  })
}
}