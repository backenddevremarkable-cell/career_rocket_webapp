 import config from "./config";
let sequelizeInstance;
 
const createSequelize = async () => {
  const { Sequelize } = await import("sequelize");

  return new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    logging: false,
  });
};

export const getSequelize = async () => {
  if (!sequelizeInstance) {
    sequelizeInstance = await createSequelize();
  }

  return sequelizeInstance;
};

export const connectDB = async () => {
   try {
    const sequelize = await getSequelize();
     await sequelize.authenticate();
     console.log("✔ Database connected");
     await sequelize.sync({ alter: false });
     console.log("✔ Models synchronized");
   } catch (error) {
     console.error("❌ Database error:", error);
   }
 };
export default getSequelize;
