import { Router } from "express";
import userController from "../controllers/user.controller.js";
import errorWrapper from "../mw/errors.mw.js";
import { body } from "express-validator";
import { isTitleValid } from "../validations/isTitle.js";

class UserRouter {
  private _router = Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.get(
      "/:id",
      errorWrapper(userController.getUserById)
    );

    this._router.get("/", errorWrapper(userController.getAllUsers));

    this._router.post(
      "/",
      body("first_name").isLength({ min: 2 }),
      body("last_name").isLength({ min: 2 }),
      body('title').custom(isTitleValid),
      body("email").isEmail(),
      body("dep_id").isNumeric(),
      errorWrapper(userController.createUser)
    );

    this._router.put(
      "/:id",
      body("first_name").isLength({ min: 2 }),
      body("last_name").isLength({ min: 2 }),
      body('title').custom(isTitleValid),
      body("email").isEmail(),
      body("dep_id").isNumeric(),
      errorWrapper(userController.updateUser)
    );

    this._router.delete("/:id",
    errorWrapper(userController.deleteUser));
  }

  get router() {
    return this._router;
  }
}

const userRouter = new UserRouter();
export default userRouter;
