"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes");
var app = express();
// app.set('port', process.env.PORT)
routes_1["default"].SetRoutes(app);
app.listen(process.env.PORT, function () {
    console.log('Servidor escuchando en puerto ', process.env.PORT);
});
