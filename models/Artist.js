// Here is where we set up our Artist model, for when we are ready to connect to a database in future activities. 

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Encrypt user password
const bcrypt = require('bcrypt');

class Artist extends Model { }

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // prevents duplicate email addresses in DB
      unique: true,
      // checks for email format (foo@bar.com)
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'artist',
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

// Export Artist models for other files
module.exports = Artist;
