'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ List }) {
      // define association here
      List.belongsTo(this, { foreignKey: 'userId' });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
  }
  User.init(
    {
      uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      phoneNumber: DataTypes.STRING,
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: DataTypes.STRING,
      imgSmall: DataTypes.STRING,
      refreshToken: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
