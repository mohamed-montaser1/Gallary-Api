import * as express from "express";
import { Express } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import * as loginRouter from "./routes/auth/login";
config();
const app: Express = express();
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL || "mongodb://0.0.0.0:27017/test";
app.use(express.json())
app.use("/api/auth", loginRouter.default);

app.listen(port, () =>
  console.log(`Listen On Port ${port}, url = http://localhost:${port}`)
);
mongoose.connect(db_url).then(() => console.log(`DB Connected Successfully!`));