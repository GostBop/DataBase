const buyers = require('./buyer');

const products = require('./product');

const trolleys = require('./trolley');

const purchase = require('./purchase');

const sellers = require('./seller');

const goods = require('./goods');

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products': async (ctx, next) => {
        let result = await products.listProduct();
        ctx.rest(result);
    },

    /* GET /api/products/goods?p_id=xxx */
    'GET /api/products/goods': async (ctx, next) => {
        let result = await goods.listGoods(ctx.query);
        ctx.rest(result);
    },
    
    /* GET /api/buyer?name=xxx */
    'GET /api/buyer': async (ctx, next) => {
        let result = await buyers.findBuyer(ctx.query.name);
        ctx.rest(result);
    },

    /* GET /api/seller?name=xxx */
    'GET /api/seller': async (ctx, next) => {
        let result = await sellers.findSeller(ctx.query.name);
        ctx.rest(result);
    },

    /* GET /api/goods?s_id=xxx&p_id=xxx */
    'GET /api/goods': async (ctx, next) => {
        let result = await goods.getGoods(ctx.query);
        ctx.rest(result);
    },

    /* GET /api/buyer/trolley?b_id=xxx */
    'GET /api/buyer/trolley': async (ctx, next) => {
        let result = await trolleys.getTrolleys(ctx.query);
        /*if (result.length === 0) {
            APIError(ctx, '-1', 'trolley has nothing');
            return;
        }*/
        ctx.rest(result);
    },

    /* GET /api/seller/listgoods?s_id=xxx */
    'GET /api/seller/listgoods': async (ctx, next) => {
        let result = await goods.listSellerGoods(ctx.query);
        ctx.rest(result);
    },

    /*GET /api/buyer/purchase?b_id=xxx*/ 
    'GET /api/buyer/purchase': async (ctx, next) => {
        let result = await purchase.listBuyerPurchase(ctx.query);
        ctx.rest(result);
    },

    /*GET /api/seller/purchase?s_id=xxx*/
    'GET /api/seller/purchase': async (ctx, next) => {
        let result = await purchase.listSellerPurchase(ctx.query);
        ctx.rest(result);
    },

    'POST /api/buyer/login': async (ctx, next) => {
        let result = await buyers.loginBuyer(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/seller/login': async (ctx, next) => {
        let result = await sellers.loginSeller(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/buyer/signup': async (ctx, next) => {
        let result = await buyers.createBuyer(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/seller/signup': async (ctx, next) => {
        let result = await sellers.createSeller(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/buyer/trolley': async (ctx, next) => {
        let result = await trolleys.addRecord(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/buyer/buy': async (ctx, next) => {
        let result = await purchase.addRecord(ctx.request.body);
        ctx.rest(result);
    },

    'POST /api/seller/goods': async (ctx, next) => {
        let result = await goods.addGoods(ctx.request.body);
        ctx.rest(result);
    },

    /*
     * deal with:
     * DELETE /api/buyer/trolley?p_id=xxx&s_id=xxx&b_id=xxx
     *
     * return:
     * if successful, code = '0', message = 'delete trolley record successfully'
     * if failed, code = '-1', message = 'record doesn't exist'
     */
    'DELETE /api/buyer/trolley': async (ctx, next) => {
        let result = await trolleys.deleteRecord(ctx.query);
        // result = { code: xxx, message: xxx }
        ctx.rest(result);
    },

    'DELETE /api/seller/goods': async (ctx, next) => {
        let result = await goods.deleteGoods(ctx.query);
        ctx.rest(result);
    }
};
