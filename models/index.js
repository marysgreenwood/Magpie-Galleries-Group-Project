const Users = require ('./users/users');
const Art = require ('./art');

 Users.hasMany(Art, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Art.belongsTo(Users, {
  foreignKey: 'user_id'
});

module.exports = { Art, Users };

