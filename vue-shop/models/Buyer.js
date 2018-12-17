const db = require('../db');

module.exports = db.defineModel('buyer', {
    name: {
        type: db.STRING(50),
        primaryKey: true
    },
    password: db.STRING(20),
    balance: db.DOUBLE(10, 2),
    address: db.STRING(100),
    phone: db.STRING(11)
});