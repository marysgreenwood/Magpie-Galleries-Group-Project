const User = require ('./users/users');
const Art = require ('./art');

 User.hasMany(Art, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Art.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { Art, User };

