import "reflect-metadata";

import express from "express";

import "../../container";

import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => response.json({ message: "Hello world" }));

app.listen(3333, () => console.log("Sever is now running by docker!"));
