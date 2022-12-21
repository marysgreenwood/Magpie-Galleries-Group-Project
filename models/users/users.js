const { Model, DateTypes } = require('sequalize');

const sequelize = require(/*insert location of env js path*/);

class Users extends Model {}

Users.init(
//columns Username, Passwordhash, id(primarykey)
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
  },
        username: {
            type: DataTypes.STRING
  },
        passwordhash: {
            type: DataTypes.//not sure yet
},
//link to database connection
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'users'
}}
);

module.exports = Users;

