import cors from "cors";
import express, { Application } from "express";
import db from "../db/connection";
import userRoutes from "../routes/usuario";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error(error as Error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Body
    this.app.use(express.json());

    //Public
    this.app.use(express.static("public"));
  }
}

export default Server;
