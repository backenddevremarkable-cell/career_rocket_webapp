module.exports = (sequelize, DataTypes) => {
    const CounsellingSession = sequelize.define("CounsellingSession", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        countryId:DataTypes.INTEGER,
        stateId:DataTypes.INTEGER,
        divisionId: DataTypes.INTEGER,
        divisionCityId:  DataTypes.INTEGER,
        blockId:DataTypes.INTEGER,
        sessionName:  DataTypes.STRING,
        studentId: DataTypes.INTEGER,
        studentName: DataTypes.STRING,
        studentEmail: DataTypes.STRING,
        studentMobile: DataTypes.STRING,
        address: DataTypes.TEXT,
        counsellorId: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER,
        remark: DataTypes.TEXT,
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
        },
        other: DataTypes.STRING,
        createdId:DataTypes.INTEGER,
    }, {
        tableName: "CounsellingSession",
        timestamps: false,
        hooks: {
            beforeUpdate: (record) => {
                record.updatedDate = new Date();
            }
        }
    });

  // 🔗 Associations
    CounsellingSession.associate = (models) => {
        CounsellingSession.belongsTo(models.State, {foreignKey: "stateId",as: "state"});
        CounsellingSession.belongsTo(models.DivisionCity, {foreignKey: "divisionCityId",as: "city" });
        CounsellingSession.belongsTo(models.Division, { foreignKey: "divisionId", as: "division" });
        CounsellingSession.belongsTo(models.Block, { foreignKey: "blockId", as: "block" });
        CounsellingSession.belongsTo(models.Services, { foreignKey: "serviceId", as: "service" });
    };
    return CounsellingSession;
};
