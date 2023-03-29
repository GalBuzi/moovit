import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect, initDB } from "./utils.js";
import UserRouter from "./routers/user.router.js";
import DepartmentRouter from "./routers/department.router.js";
import { ErrorResponse, NotFound } from "./mw/errors.mw.js";
import helmet from "helmet";
class App {
    constructor() {
        this.app = express();
        this.initMiddleWares();
        this.initRouting();
        this.initErrorHandling();
    }
    initMiddleWares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }
    initRouting() {
        this.app.use('/users', UserRouter.router);
        this.app.use('/departments', DepartmentRouter.router);
    }
    initErrorHandling() {
        this.app.use(NotFound);
        this.app.use(ErrorResponse);
    }
    async startServer() {
        await connect();
        await initDB();
        const port = 3000; //process.env.SERVER_LOCAL_PORT ||
        this.app.listen(port, () => {
            console.log(`Worker: process ${process.pid} is up on port ${port}`);
        });
    }
}
const app = new App();
export default app;
