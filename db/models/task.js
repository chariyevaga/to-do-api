'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, List }) {
      // define association here
      User.hasMany(this, { foreignKey: 'userId' });
      List.hasMany(this, { foreignKey: 'listId' });
      this.belongsTo(List, { foreignKey: 'listId' });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        listId: undefined,
      };
    }
  }
  Task.init(
    {
      uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true },
      text: DataTypes.STRING,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
