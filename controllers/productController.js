const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

  return res.render('products',{
    products,
    toThousand
  })
},
  
    carrito: (req, res) => {
        return res.render('productos/carrito');
    },
    detalleproducto: (req, res) => {
      let product= products.find(product => product.id === +req.params.id);
        return res.render('productos/detalle-producto', {
          ...product
        });
    }, 
    edicion: (req, res) => {
      const { id } = req.params;
      const product = products.find(product => product.id === +id);
      return res.render('productos/edicion', {
          ...product,
          toThousand
      });
  },
  
  /* Update - Method to update */
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
          image: product.image,
          subCategory,
          category
          
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
        return res.render('productos/crear-item');
},
  store: (req,res)=>{
    const{name,price,description,discount,image,category,subCategory}= req.body;
    const newProduct={
        id:products[products.length -1].id +1,
        name:name.trim(),
        description: description.trim(),
        price:+price,
        discount:+discount,
        image:null,
        subCategory,
        category
    };
    products.push(newProduct);
    fs.writeFileSync('./data/productDataBase.json', JSON.stringify(products, null,3), 'utf-8')
    return res.redirect('/')
  },
  removeConfirm : (req,res) => {
    const id = req.params.id;
    const product = products.find(product => product.id === +id);

    return res.render('productos/confirmRemove',{
      ...product
    })
  },
  remove : (req,res) => {
    const id = req.params.id;
    const productsModified = products.filter(product => product.id !== +id);


    fs.writeFileSync('./data/productDataBase.json',JSON.stringify(productsModified, null, 3),'utf-8')
    return res.redirect(`/products`)   
  }

}