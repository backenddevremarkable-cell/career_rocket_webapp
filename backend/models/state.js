module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
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
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Country",
            key: "id"
        }
    }
    },
    {
        tableName: "States",
        timestamps: false
    });
    State.associate = (models) => {
        State.hasMany(models.City, {
            foreignKey: "stateId",
            as: "cities"
        });

        State.hasMany(models.Student, {
            foreignKey: "stateId",
            as: "students"
        });
    };


  return State;
  
};
