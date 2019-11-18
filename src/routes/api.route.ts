import { BaseRoute } from "../core/base.route";

export class APIRouteClass extends BaseRoute {
    public routes(): BaseRoute {
        this.app.route('/api/contact/new').post(this.contactController.createNewContact.bind(this));

        return this;
    }
}
