import { BaseRoute } from "../core/base.route";
import { authenticate } from "../middlewares/authentication.middleware";

export class APIRouteClass extends BaseRoute {
    public routes(): BaseRoute {
        this.app.route('/registration').post(this.userController.registration.bind(this));
        this.app.route('/login').post(this.userController.login.bind(this));
        this.app.route('/private').get(authenticate.bind(this), this.contactController.getContactList.bind(this));

        return this;
    }
}
