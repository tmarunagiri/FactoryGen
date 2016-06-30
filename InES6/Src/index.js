import angular from "angular";
import app from "client/module";
import "client/moduleLoader";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap-theme.min.css";
import "../node_modules/jstree/dist/themes/default/style.min.css";

angular.bootstrap(document,[app.name]);