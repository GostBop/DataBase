const db = require('../db');

module.exports = db.defineModel('purchase', {
  id: {
    type: db.STRING(50),
    primaryKey: true
  },
  p_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  s_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  b_id: {
    type: db.STRING(50),
    primaryKey: true
  },
  name: db.STRING(50),
  price: db.DOUBLE(10, 2),
  img: db.STRING(50)
});