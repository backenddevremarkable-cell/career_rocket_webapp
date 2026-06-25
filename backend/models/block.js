module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define("Block", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_en:  DataTypes.STRING,
        name_hi:  DataTypes.STRING,
        cityId:  DataTypes.INTEGER,
        divisionCityId:DataTypes.INTEGER,
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
        tableName: "Block",
        timestamps: false,
        hooks: {
            beforeUpdate: (record) => {
                record.updatedDate = new Date();
            }
        }
    });
    // 🔗 Associations
    Block.associate = (models) => {
        Block.belongsTo(models.DivisionCity, {foreignKey: "divisionCityId",as: "city"});
    };
    return Block;
};
