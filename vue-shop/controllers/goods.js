// store products as database;
const model = require('../model');

const Seller = require('./seller');

const Trolley = model.Trolley;

const Product = require('./product');

let Goods = model.Goods;



module.exports = {
  listGoods: async (record) => {
    let product = await Product.getProduct(record.p_id);

    if(product.code === '-1') {
      return product;
    }
    
    let goods = await Goods.findAll({
      where: {
        p_id: record.p_id
      }
    });

    if(goods.length === 0) {
      return {
        code: '-1',
        message: 'There is no goods'
      }
    }

    return {
      code: '0',
      data: goods
    }
  },

  listSellerGoods: async (record) => {
    let seller = await Seller.findSeller(record.s_id)

    if (seller.code === '-1') {
      return seller;
    }

    let goods = await Goods.findAll({
      where: {
        s_id: record.s_id
      }
    });

    if (goods.length === 0) {
      return {
        code: '-1',
        message: 'There is no goods'
      }
    }

    return {
      code: '0',
      data: goods
    }
  },

  getGoods: async (good) => {
    let goods = await Goods.findAll({
      where: {
        p_id: good.p_id,
        s_id: good.s_id
      }
    });

    if(goods.length === 0) {
      return {
        code: '-1',
        message: 'there is no this good'
      }
    }

    return {
      code: '0',
      data: goods[0]
    }
  },

  deleteGoods: async (Good) => {
    let result = await Goods.findAll({
      where: {
        p_id: Good.p_id,
        s_id: Good.s_id
      }
    });
    if (result.length === 0) {
      return {
        code: '-1',
        message: 'good doesn\'t exist'
      }
    }

    let g = await Goods.findAll({
      where: {
        p_id: Good.p_id
      }
    });

    if (g.length === 0) {
      let p = await Product.getProduct(Good.p_id);
      p.data.update({
        onStock: 0
      });
    }


    let trolley = await Trolley.findAll({
      where: {
        p_id: Good.p_id,
        s_id: Good.s_id
      }
    });
    if (trolley.length > 0) {
      trolley[0].destroy();
    }
    

    result[0].destroy();
    return {
      code: '0',
      message: 'delete this good successfully'
    };
  },

  addGoods: async (Good) => {
    let seller = await Seller.findSeller(Good.s_id);
    let product = await Product.getProduct(Good.p_id);

    if(seller.code === '-1' || product.code === '-1'){
      return {
        code: '-1',
        message: 'there is no this seller or product'
      }
    }
    product.data.update({
      onStock: 1
    });

    let good = await Goods.findAll({
      where: {
        p_id: Good.p_id,
        s_id: Good.s_id
      }
    });

    if(good.length > 0){
      return {
        code: '-1',
        message: 'Don\'t repeat add this good'
      }
    } 
    let new_balance = seller.data.balance - product.data.price;
    if (new_balance < 0) {
      return {
        code: '-1',
        message: 'you have no enough money'
      }
    }
    
    seller.data.update({
      balance: new_balance
    });

    let result =  await Goods.create({
      p_id: Good.p_id,
      name: Good.name,
      price: Good.price,
      s_id: Good.s_id,
      img: product.data.img
    });

    return {
      code: '0',
      data: result
    }
  }
};