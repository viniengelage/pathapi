import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { setLocale } from "yup";

import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";
import { bree } from "@shared/infra/bree";

import createConnection from "../typeorm";
import { router } from "./routes";

import "@shared/container";
import "@config/cloudnary";

dotenv.config();

createConnection();

bree.start();

setLocale({
  string: {
    email: "Digite um e-mail válido",
    // eslint-disable-next-line no-template-curly-in-string
    min: "Deve possuir no mínimo ${min} caracteres",
  },
  mixed: {
    required: "É um campo necessário",
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

// app.use("/images", express.static("public"));
// app.use("/avatars", express.static("../../../../tmp/avatar"));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    if (err instanceof ValidationError) {
      return response.status(err.statusCode).json({
        status: "Validation error",
        errors: err.errors,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(process.env.PORT || 3333, () =>
  console.log("Sever is now running by docker!")
);
