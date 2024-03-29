'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      User.hasMany(this, { foreignKey: 'userId' });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      };
    }
  }
  List.init(
    {
      uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'List',
      tableName: 'lists',
      underscored: true,
    }
  );
  return List;
};
