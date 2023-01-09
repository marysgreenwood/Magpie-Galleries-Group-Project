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

 { 
  hooks: {
    // Funtion to encrypt a password
    beforeCreate: async (newUserData) => {
      const salt = bcrypt.genSaltSync();
      newUserData.password = bcrypt.hashSync(newUserData.password, salt);
    
    },
    
    // Funtion to encrypt a password
   beforeUpdate: (userData) => {
      const salt = bcrypt.genSaltSync();
      userData.password = bcrypt.hashSync(userData.password, salt);
    
    },
    
    
    // Validation of a password
    prototype.validPassword = function(password){
      return bcrypt.compareSync(password, this.password)
    } 

  };

  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'users'
}
);







module.exports = Users;

