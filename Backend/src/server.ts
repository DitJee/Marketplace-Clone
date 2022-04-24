import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./dbconfig/dbconnector";
import testRouter from "./routes/index";
import router from "./routes/test.routes";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
    this.app.use(express.json({ type: "application/vnd.api+json" }));
    this.app.use(cors());
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err);
      console.log("Connected");
    });
  }

  private routerConfig() {
    this.app.use(testRouter);
    this.app.use("/api", router);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
