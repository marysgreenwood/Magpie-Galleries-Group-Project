const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Art extends Model {}

Art.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.STRING,
          },
          date_added: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          artist_key: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
          },
  
      },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'art',
        }
)

module.exports= Art;