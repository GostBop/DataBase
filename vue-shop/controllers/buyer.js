// store products as database;
const model = require('../model');

let Buyer = model.Buyer;


module.exports = {
    loginBuyer: async (targetBuyer) => {
        let result =  await Buyer.findAll({
            where: {
                name: targetBuyer.name,
                password: targetBuyer.password
            }
        });

        if (result.length === 0) {
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

    findBuyer: async (targetBuyerName) => {
        let buyer =  await Buyer.findAll({
            where: {
                name: targetBuyerName
            }
        });

        if (buyer.length === 0) {
            return {
                code: '-1',
                message: 'there is no this buyer'
            }
        }

        return {
            code: '0',
            data: buyer[0]
        }
    },

    createBuyer: async (newBuyer) => {

        let buyer = await Buyer.findAll({
            where: {
                name: newBuyer.name
            }
        });

        if (buyer.length > '0') {
            return {
                code: '-1',
                message: 'this buyer had existed'
            }
        }
        let result =  await Buyer.create({
            name: newBuyer.name,
            address: newBuyer.address,
            password: newBuyer.password,
            balance: 2000,
            phone: newBuyer.phone
        });

        return {
            code: '0',
            data: result
        }
    }
};