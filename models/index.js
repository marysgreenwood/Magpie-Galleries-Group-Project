const Users = require ('./users/users');
const Art = require ('./art');

 Users.hasMany(Art, {
  foreignKey: 'artist_key',
  onDelete: 'CASCADE'
});

Art.belongsTo(Users, {
  foreignKey: 'artist_key'
});

module.exports = { Art, Users };

