import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import { BaseRoute } from "./core/base.route";
import { APIRouteClass } from "./routes/api.route";
import { ChannelsRouteClass } from "./routes/channels.route";
import { WebRouteClass } from "./routes/web.route";
import { ConsoleRouteClass } from "./routes/console.route";

export class Application {
    public readonly app: express.Application;

    private routes: BaseRoute[] = [];

    constructor() {
        this.app = express();
        this.config();
        this.appendRoutes();
        this.activateRoutes();
    }
    public listen(port: number | string = 4000): Application {
        this.app.listen(port, () => console.log(`Express server listening on: http://localhost:${port}`));
        return this;
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'html');
        this.app.engine('html', require('ejs').renderFile);
    }
    private appendRoutes(): void {
        this.routes.push(<APIRouteClass>new APIRouteClass(this.app));
        this.routes.push(<WebRouteClass>new WebRouteClass(this.app));
        this.routes.push(<ConsoleRouteClass>new ConsoleRouteClass(this.app));
        this.routes.push(<ChannelsRouteClass>new ChannelsRouteClass(this.app));
    }
    private activateRoutes(): void {
        this.routes.map((route: APIRouteClass | WebRouteClass | ConsoleRouteClass | ChannelsRouteClass) => route.routes())
    }
}
