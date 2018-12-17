// store products as database;
const model = require('../model');

const Trolley = require('./trolley');

const Seller = require('./seller');

const uuidv1 = require('uuid/v1');

const Goods = require('./goods');

const Buyer = require('./buyer');

const Product = require('./product');

let Purchase = model.Purchase;


function generateId() {
  return uuidv1();
}


module.exports = {
  addRecord: async (record) => {
    let error = await Trolley.deleteRecord(record);
    
    if(error.code === '-1') {
      return {
        code: '-1',
        message: 'trolley has no this good'
      }
    }

    let buyer = await Buyer.findBuyer(record.b_id);

    let seller = await Seller.findSeller(record.s_id);

    let good = await Goods.getGoods({
      p_id: record.p_id,
      s_id: record.s_id
    });

    /*if (buyer.length === 0 || good.length === 0) {
      return {
        id: -1,
        message: 'there is no this buyer or good'
      }
    }*/

    let new_buyerBalance = buyer.data.balance - good.data.price;
    let new_sellerBalance = seller.data.balance + good.data.price;

    if (new_buyerBalance < 0) {
      return {
        code: '-1',
        message: 'you have no enough money'
      };
    }

    seller.data.update({
      balance: new_sellerBalance
    });

    buyer.data.update({
      balance: new_buyerBalance
    });

    let result = await Purchase.create({
      id: generateId(),
      p_id: record.p_id,
      s_id: record.s_id,
      b_id: record.b_id,
      name: good.data.name,
      price: good.data.price,
      img: good.data.img
    });

    await Trolley.deleteTrolley(good.data);

    good.data.destroy();
    
    let g = await Goods.listGoods(record);

    if (g.code === '-1') {
      
      let p = await Product.getProduct(record.p_id);
      p.data.update({
        onStock: 0
      });
    }

    

    return {
      code: '0',
      data: result
    }
  },

  listBuyerPurchase: async (record) => {
    let purchase =  await Purchase.findAll({
      where: {
        b_id: record.b_id
      }
    });


    if (purchase.length === 0) {
      return {
        code: '-1',
        message: 'there is no purchase'
      }
    }

    return {
      code: '0',
      data: purchase
    }
  },

  listSellerPurchase: async (record) => {
    let purchase =  await Purchase.findAll({
      where: {
        s_id: record.s_id
      }
    });

    if(purchase.length === 0) {
      return {
        code: '-1',
        message: 'there is no purchase'
      }
    }

    return {
      code: '0',
      data: purchase
    }
  }
};