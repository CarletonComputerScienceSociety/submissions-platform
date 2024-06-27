import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { errorHandler, notFound } from "./middleware";
import { default as restRouter } from "./router";

dotenv.config();

class Application {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.set("host", process.env.HOST || "localhost");
    this.server.set("port", process.env.PORT || 5000);
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/api/", restRouter);
    this.server.use(notFound);
    this.server.use(errorHandler);
  }

  public start(): void {
    const host: string = this.server.get("host");
    const port: number = this.server.get("port");

    this.server.listen(port, host, () => {
      console.log(`Server started at http://${host}:${port}`);
    });
  }
}

const app: Application = new Application();
app.start();
