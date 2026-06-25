module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define("School", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "City",
                key: "id"
            }
        }
    },
    {
        tableName: "Schools",
        timestamps: false
    });
  return School;
};
