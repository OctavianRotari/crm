// @flow
import { configureRoutes } from "../core/src/utils/bundler";

// routes
import * as Activity from "./pages/Activity";
import * as Customers from "./pages/Customers";
import * as Dashboard from "./pages/Dashboard";
import * as Products from "./pages/Products";
import * as Registration from "./pages/Registration";
import * as Schedule from "./pages/Schedule";

export default configureRoutes([
    Activity,
    Customers,
    Dashboard,
    Products,
    Registration,
    Schedule
]);
