module.exports = ({ arrProducts, req }) => {
  return arrProducts.map((product) => {
    const productMap = {
      ...product.dataValues,
      isFavorite: false,
    };
    if (
      product.usersFavorites.some(
        (user) => user.id === req.session.userLogin?.id
      )
    ) {
      productMap.isFavorite = true;
    }
    return productMap;
  });
};
