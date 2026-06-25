module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("Country", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_hi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sortname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryFlag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonecode:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    tableName: "Country",
    timestamps: false
  });
    Country.associate = (db) => {
    Country.hasMany(db.State, {
      foreignKey: "countryId",
      as: "states"
    });
    Country.belongsTo(db.Student, { foreignKey: "countryId", as:"country" });
    
  };
  Country.associate = (db) => {
    Country.hasMany(db.State, {
      foreignKey: "countryId",
      as: "states"
    });

    Country.hasMany(db.Student, {
      foreignKey: "countryId",
      as: "students"
    });
  };
  Country.associate = (models) => {
    Country.hasMany(models.State, {
      foreignKey: "countryId",
      as: "states"
    });

    Country.hasMany(models.Student, {
      foreignKey: "countryId",
      as: "students"
    });
  };



  return Country;
};
