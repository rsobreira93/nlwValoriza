import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/authenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import {ensureAuthenticaded} from "./middlewares/ensureAuthenticaded";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController()

router.post("/users",createUserController.handle);
router.post("/tags", ensureAuthenticaded, ensureAdmin, createTagController.handle);
router.post("/login", autheticateUserController.handle);
router.post("/compliments", ensureAuthenticaded, complimentController.handle);

router.get("/users/compliments/send", ensureAuthenticaded, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticaded, listUserReceiveComplimentsController.handle);

router.get("/tags", ensureAuthenticaded, listTagsController.handle);
router.get("/users", ensureAuthenticaded, listUsersController.handle)

export { router };