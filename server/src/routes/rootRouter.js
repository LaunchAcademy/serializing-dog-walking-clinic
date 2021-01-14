import express from "express";
import customersRouter from "./api/v1/customersRouter.js";
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router(); //place your server-side routes here

rootRouter.use("/api/v1/customers", customersRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
