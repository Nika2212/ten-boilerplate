import express from 'express';
import { ContactController } from "../controllers/contact.controller";

export class BaseRoute {
    protected contactController = new ContactController;

    constructor(protected app: express.Application) {}
}
