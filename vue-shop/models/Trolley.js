const db = require('../db');

module.exports = db.defineModel('trolley', {
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
});