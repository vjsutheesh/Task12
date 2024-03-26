import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("login");
  this.route("home");
  this.route("list");
  this.route("display", { path: "display/:table_name" });
  this.route("add", { path: "add/:table_name" });
  this.route("edit", { path: "edit/:table_name/:id" });
});

export default Router;
