import { BaseController } from "../core/base.controller";
import { Request, Response } from "express";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";

export class ContactController extends BaseController {
    public async getContactList(req: Request, res: Response): Promise<Response> {
        const contactList: any[] = await Contact.find({});

        return res.send(contactList);
    }
}
