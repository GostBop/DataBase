const db = require('../db');

module.exports = db.defineModel('product', {
  p_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  name: db.STRING(100),
  price: db.DOUBLE(10, 2),
  category: db.STRING(50),
  img: db.STRING(50),
  onStock: db.INTEGER
});
