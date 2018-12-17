const db = require('../db');

module.exports = db.defineModel('goods', {
  p_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  name: db.STRING(100),
  price: db.DOUBLE(10, 2),
  s_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  img: db.STRING(50)
});