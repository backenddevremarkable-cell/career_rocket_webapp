module.exports = (sequelize, DataTypes) => {
    const DivisionCity = sequelize.define("DivisionCity", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        divisionId:DataTypes.INTEGER,
        stateId:DataTypes.INTEGER,
        cityId: DataTypes.INTEGER,        
        cityName_en: DataTypes.STRING,        
        cityName_hi: DataTypes.STRING,
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
        tableName: "DivisionCity",
        timestamps: false,
        hooks: {
            beforeUpdate: (record) => {
                record.updatedDate = new Date();
            }
        }
    });
    // 🔗 Associations
    DivisionCity.associate = (models) => {
        DivisionCity.belongsTo(models.Division, {foreignKey: "divisionId",as: "division"});
        DivisionCity.belongsTo(models.City, {foreignKey: "cityId",as: "city"});
    };
    return DivisionCity;
};
