const fs = require('fs');

module.exports = {
    'GET /': async (ctx) => {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream(__dirname + '/../index.html');
    }
};
