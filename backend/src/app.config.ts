import environmentVariablesLoader from "./environmentVariablesLoader";
environmentVariablesLoader();

import { Router } from "express";
import { App } from "./app";
import { RequestValidator } from "./middleware/RequestValidator";
import { UserController, UserService, UserRoute } from './entities/user';
import tools from "./tools";

// services
const userService = new UserService(tools);

// middleware
const requestValidator = new RequestValidator(tools);

// controllers
const userController = new UserController(tools, userService);

// routes
const userRoute = new UserRoute(Router(), requestValidator, userController);

export default {
  app: new App([userRoute]),
  tools: tools
};