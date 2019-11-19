import { ContactController } from "../controllers/contact.controller";
import { UserController } from "../controllers/user.controller";
import express from 'express';

export class BaseRoute {
    protected contactController = new ContactController;
    protected userController = new UserController;

    constructor(protected app: express.Application) {}
}
