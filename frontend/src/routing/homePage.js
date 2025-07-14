import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import HomePage from "../pages/HomePage";

export const homePage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: <HomePage />,
});
