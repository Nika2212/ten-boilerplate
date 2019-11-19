import { BaseController } from "../core/base.controller";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { validateLogin, validateRegistration } from "../helpers/validators.helper";
import * as bcrypt from "bcryptjs";

export class UserController extends BaseController {
    public async registration(req: Request, res: Response): Promise<Response> {
        let { name, email, password } = req.body;
        const error = validateRegistration(req.body).error;

        if (error) return res.status(400).send(error.details);
        if (await User.findOne({email})) return res.status(409).send('User already exists.');

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        // @ts-ignore
        return res.status(200).header('X-Access-Token', user.generateAuthToken()).send({
            _id : user._id,
            name,
            email,
        }).send();
    }
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const error = validateLogin(req.body).error;

        if (error) return res.status(400).send(error.details);

        const user = await User.findOne({email});

        if (!user) {
            return res.status(409).send('Wrong email/password');
        } else {
            console.log(password, user.get('password'));
            bcrypt.compare(password, user.get('password'), (err: any, isMatch: boolean) => {
                if (err) {
                    console.error(err);
                } else {
                    if (isMatch) {
                        // @ts-ignore
                        return res.status(200).header('X-Access-Token', user.generateAuthToken()).send();
                    } else {
                        return res.status(409).send('Wrong email/password');
                    }
                }
            });
        }
    }
}
