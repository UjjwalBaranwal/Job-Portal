import mongoose from "mongoose";

export const dbConnection = () => {
  const DB = process.env.DATABASE_URL.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  console.log(process.env.DATABASE_URL);
  mongoose
    .connect(DB, {
      dbName: "JOB_PORTAL_DATABASE",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(`Error Happen => ${err}`);
    });
};

// console.log(process.env.DATABASE_URL);
