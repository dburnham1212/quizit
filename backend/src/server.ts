import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin:["http://localhost:4200"]
}));

const port = 5000;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port)
});