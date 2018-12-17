// store products as database;
const model = require('../model');

const Buyer = require('./buyer');

const Goods = require('./goods');

let Trolley = model.Trolley;

module.exports = {
    deleteRecord: async (record) => {
        let result = await Trolley.findAll({
            where: {
                p_id: record.p_id,
                s_id: record.s_id,
                b_id: record.b_id
            }
        });
        if (result.length === 0) {
            return {
                code: '-1',
                message: 'record doesn\'t exist'
            }
        }
        result[0].destroy();
        return {
            code: '0',
            message: 'delete trolley record successfully'
        };
    },

    //when a good in the trolley is deleted
    deleteTrolley: async (record) => {
        let result = await Trolley.findAll({
            where: {
                p_id: record.p_id,
                s_id: record.s_id
            }
        });
        if (result.length === 0) {
            return {
                code: '-1',
                message: 'record doesn\'t exist'
            }
        }
        result[0].destroy();
        return {
            code: '0',
            message: 'delete trolley record successfully'
        };
    },
    
    addRecord: async(record) => {
        let good = await Goods.getGoods({
            p_id: record.p_id,
            s_id: record.s_id
        });

        let buyer = await Buyer.findBuyer(record.b_id);

        if(good.code === '-1' || buyer.code === '-1') {
            return {
                code: '-1',
                message: 'There is no this good or buyer'
            }
        }

        let trolley = await Trolley.findAll({
            where: {
                p_id: record.p_id,
                s_id: record.s_id,
                b_id: record.b_id
            }
        });

        if(trolley.length > 0) {
            return {
                code: '-1',
                message: 'this good has been in the trolley'
            }
        }

        let result =  await Trolley.create({
            p_id: record.p_id,
            s_id: record.s_id,
            b_id: record.b_id
        });

        return {
            code: '0',
            data: result
        }
    },

    getTrolleys: async(record) => {
        let buyer = await Buyer.findBuyer(record.b_id);

        if(buyer.code === '-1') {
            return buyer
        }

        let trolley = await Trolley.findAll({
            where: {
                b_id: record.b_id
            }
        });
        
        /*if(trolley.length === 0) {
            return {
                p_id: -1,
                message: 'there is nothing in the trolley'
            }
        }*/

        let goods = [];
        for (let i = 0, len = trolley.length; i < len; i++) {
            let good = await Goods.getGoods({
                p_id: trolley[i].p_id,
                s_id: trolley[i].s_id
            });
            goods.push(good.data);
        }

        return {
            code: '0',
            data: goods
        }
    }
};