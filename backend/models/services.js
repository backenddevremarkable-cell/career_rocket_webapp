module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define("Services", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    showOnDash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    navToExp:{
      type: DataTypes.INTEGER,
      defaultValue:0
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
    tableName: "Services",
    timestamps: false
  });

  return Services;
};
