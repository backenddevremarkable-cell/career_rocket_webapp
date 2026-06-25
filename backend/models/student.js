module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      otp:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpExpires:{
        type: DataTypes.DATE,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      educationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stream: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      other: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rewardPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      referralCode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      joinCode:{
        type: DataTypes.STRING,
        allowNull: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      jwtVersion:DataTypes.INTEGER,
      deleteRequestTime:DataTypes.BIGINT
    },
    {
      tableName: "Students",
      timestamps: false,

      hooks: {
        beforeUpdate: (student) => {
          student.updatedDate = new Date();
        },
      },
    }
  );
   // OPTIONAL ASSOCIATIONS
  Student.associate = (models) => {
    Student.belongsTo(models.State, {
      foreignKey: "stateId",
      as: "state"
    });

    Student.belongsTo(models.City, {
      foreignKey: "cityId",
      as: "city"
    });

    Student.belongsTo(models.Country, {
      foreignKey: "countryId",
      as: "country"
    });

    Student.belongsTo(models.School, {
      foreignKey: "schoolId",
      as: "school"
    });
  };

  return Student;
};
