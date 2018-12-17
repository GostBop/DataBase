// store products as database;
const model = require('./model');

let Buyer = model.Buyer;

let buyer;

(async () => {
    buyer = await Buyer.findAll();
})();

module.exports = {
    findBuyer: async (targetBuyer) => {
        return await Buyer.findAll({
            where: {
                name: targetBuyer.name,
                password: targetBuyer.password
            }
        });
    },

    createBuyer: async (newBuyer) => {
        return await Buyer.create({
            name: newBuyer.name,
            address: newBuyer.address,
            password: newBuyer.password,
            balance: 100,
            phone: newBuyer.phone
        });
    }
};