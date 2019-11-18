import { BaseController } from "../core/base.controller";
import { Request, Response } from "express";
import { ContactSchema } from "../models/contact.model";
import * as mongoose from 'mongoose';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController extends BaseController {
    public createNewContact(req: Request, res: Response): void {
        const newContact = new Contact(req.body);

        newContact.save()
            .then((contact: any) => res.json(contact))
            .catch((error: any) => res.send(error))
    }
}
