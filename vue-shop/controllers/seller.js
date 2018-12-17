// store products as database;
const model = require('../model');

let Seller = model.Seller;

module.exports = {
  loginSeller: async (targetSeller) => {
    let result =  await Seller.findAll({
      where: {
        name: targetSeller.name,
        password: targetSeller.password
      }
    });

    if(result.length === 0) {
      return {
        code: '-1',
        message: 'user doesn\'t exist or password is wrong'
      }
    }

    return {
      code: '0',
      data: result[0]
    }
  },

  findSeller: async (targetSellerName) => {
    let seller =  await Seller.findAll({
      where: {
        name: targetSellerName
      }
    });

    if(seller.length === 0) {
      return {
        code: '-1',
        message: 'there is no this seller'
      }
    }
    return {
      code: '0',
      data: seller[0]
    }
  },

  createSeller: async (newSeller) => {
    let seller = await Seller.findAll({
      where: {
        name: newSeller.name
      }
    });

    if(seller.length > '0') {
      return {
        code: '-1',
        message: 'this seller had existed'
      }
    }

    let result =  await Seller.create({
      name: newSeller.name,
      address: newSeller.address,
      password: newSeller.password,
      balance: 2000,
      phone: newSeller.phone
    });

    return {
      code: '0',
      data: result
    }
  }
};