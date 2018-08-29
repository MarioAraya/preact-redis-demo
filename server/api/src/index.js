"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes");
var constants = require("./services/constants");
var app = express();
app.set('port', constants.appApiPort);
routes_1["default"].SetRoutes(app);
app.listen(app.get('port'), function () {
    console.log('Servidor escuchando en puerto ', app.get('port'));
});
