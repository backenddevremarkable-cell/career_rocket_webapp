module.exports = (sequelize, DataTypes) => {
  const Division = sequelize.define("Division", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_en:  DataTypes.STRING,
    name_hi:  DataTypes.STRING,
    stateId:  DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "Division",
    timestamps: false,
    hooks: {
      beforeUpdate: (record) => {
        record.updatedDate = new Date();
      }
    }
  });
  // 🔗 Associations
  Division.associate = (models) => {
    Division.belongsTo(models.State, {foreignKey: "stateId",as: "state"});
  };
  return Division;
};
