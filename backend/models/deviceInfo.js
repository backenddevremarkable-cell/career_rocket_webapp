module.exports = (sequelize, DataTypes) => {
  const DeviceInfo = sequelize.define(
    "DeviceInfo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        deviceType: {
            type: DataTypes.ENUM("ios", "android"),
            allowNull: true,
        },

        fcmToken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        deviceId: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1, // 1 = active
        },
        userType:{
            type:DataTypes.STRING
        },
        appVersion: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        updatedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "DeviceInfo",
        timestamps: false,
        hooks: {
            beforeUpdate: (device) => {
                device.updatedDate = new Date();
            },
        },
    }
  );

  return DeviceInfo;
};
