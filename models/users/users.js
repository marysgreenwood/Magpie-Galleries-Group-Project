const { Model, DateTypes } = require('sequelize');

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
        prounouns: {
            type: DataTypes.STRING
},
        username: {
            type: DataTypes.STRING
  },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
   /*         validate: {
                notNull: {
                    msg:
                }
            }*/
},
        passwordhash: {
            type: DataTypes.STRING
},
//link to database connection

  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'users'
}
);

module.exports = Users;

