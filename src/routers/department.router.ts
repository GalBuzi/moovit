import { Router } from "express";
import errorWrapper from "../mw/errors.mw.js";
import departmentController from "../controllers/department.controller.js";
import { body } from "express-validator";

class DepartmentRouter {
  private _router = Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.get(
      "/:id",
      errorWrapper(departmentController.getDepartmentById)
    );

    this._router.get(
      "/",
      errorWrapper(departmentController.getAllDepartments)
    );

    this._router.post(
      "/",
      body("name").isLength({ min: 2 }),
      errorWrapper(departmentController.createDepartment)
    );

    this._router.put(
      "/:id",
      errorWrapper(departmentController.updateDepartment)
    );

    this._router.get(
      "/count_users/:order_by",
      errorWrapper(departmentController.getAllDepartmentsUsersCount)
    );

    this._router.delete(
      "/:id",
      errorWrapper(departmentController.deleteDepartment)
    );
  }

  get router() {
    return this._router;
  }
}

const departmentRouter = new DepartmentRouter();
export default departmentRouter;
