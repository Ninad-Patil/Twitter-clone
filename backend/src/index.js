import express from "express";
import PORT from "./config/server-config.js";
import cookieParser from "cookie-Parser";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";
import databaseConnection from "./config/database.js";
import cors from "cors";
databaseConnection();
const app = express();
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
