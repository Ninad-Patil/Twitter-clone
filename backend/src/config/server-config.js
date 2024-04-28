import dotenv from "dotenv";

//the moment you call dotenv.config it loads the port in global process obj
dotenv.config();
const PORT = process.env.PORT;
export default PORT;
