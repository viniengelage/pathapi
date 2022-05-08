import express from "express";

import "./shared/infra/typeorm";

const app = express();

app.get("/", (request, response) => response.json({ message: "Hello world" }));

app.listen(3333, () => console.log("Sever is now running by docker!"));
