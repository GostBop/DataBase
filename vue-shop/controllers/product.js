// store products as database;
const model = require('../model');


let Product = model.Product;

module.exports = {
  listProduct: async () => {
    let product = await Product.findAll();
    
    if(product.length === 0) {
      return {
        code: '-1',
        message: 'there are no products'
      }
    }
    return {
      code: '0',
      data: product
    }
  },

  getProduct: async (id) => {
    let product =  await Product.findAll({
      where: {
        p_id: id
      }
    });
    if(product.length === 0) {
      return {
        code: '-1',
        message: 'there is no this product'
      }
    }

    return {
      code: '0',
      data: product[0]
    }
  }
};