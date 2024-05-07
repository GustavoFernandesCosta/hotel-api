import express from "express";
import { config } from "dotenv";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
