import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { authRoute } from "./auth.route.js";
import { dashboard } from "./dashboard.js";
import { homePage } from "./homePage";

export const rootRoute = createRootRoute({
  component: <App />,
});

export const routeTree = rootRoute.addChildren([homePage, authRoute, dashboard]);

