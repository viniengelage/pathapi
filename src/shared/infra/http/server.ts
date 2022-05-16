import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { setLocale } from "yup";

import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";

import createConnection from "../typeorm";
import { router } from "./routes";

import "../../container";

dotenv.config();

createConnection();

setLocale({
  string: {
    email: "Digite um e-mail válido",
  },
  mixed: {
    required: "É um campo necessário",
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

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

app.listen(3333, () => console.log("Sever is now running by docker!"));
