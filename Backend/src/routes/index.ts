import express from "express";

const testRouter = express.Router();

testRouter.get("/api", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Welcome to API Node.js + PostgreSQL + Azure",
    version: "1.0.0",
  });
});

export default testRouter;
