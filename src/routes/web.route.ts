import { BaseRoute } from "../core/base.route";
import { Request, Response } from 'express';

export class WebRouteClass extends BaseRoute {
    public routes(): BaseRoute {
        return this;
    }
}
