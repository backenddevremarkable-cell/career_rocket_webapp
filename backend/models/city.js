module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {
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
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "States",
                key: "id"
            }
        }
    },
    {
        tableName: "City",
        timestamps: false
    });
    City.associate = (models) => {
        City.belongsTo(models.State, {
            foreignKey: "stateId",
            as: "state"
        });

        City.hasMany(models.Student, {
            foreignKey: "cityId",
            as: "students"
        });
    };
  return City;
};
