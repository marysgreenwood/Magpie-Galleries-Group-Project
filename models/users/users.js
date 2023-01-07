const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
//const sequelize = require(/*insert location of env js path*/);

class Users extends Model {}

Users.init(
//columns Username, Passwordhash, id(primarykey)
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
  },
        pronouns: {
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
},
//link to database connection}

 { sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'users'
}
);

// Funtion to encrypt a password
Artist.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

});

// Funtion to encrypt a password
Artist.beforeUpdate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

});


// Validation of a password
Artist.prototype.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

// Create all the tables in the specified DB
sequelize.sync()
  .then(() => console.log("Artist tables have been successfully created if one does not exist"))
  .catch(error => console.log("This error occured", error))


module.exports = Users;

