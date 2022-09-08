import dotenv from "dotenv";
import express  from "express";
import "express-async-errors";
import cors from "cors";
import {router} from "./routes/router";
import {errorHandler} from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000);
console.log(`Listening  at ${process.env.PORT}`);