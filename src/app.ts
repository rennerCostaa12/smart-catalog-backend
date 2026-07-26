import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { routes } from "./shared/http/routes";
import { errorHandler } from "./shared/middlewares/error-handler";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
