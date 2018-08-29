"use strict";
exports.__esModule = true;
var constants = require("./constants");
exports["default"] = {
    getCoordenadas: function (ciudad) {
        if (!ciudad)
            return;
        return constants.httpClient.get(constants.googleApiUrl + ciudad)
            .then(function (resForecast) {
            console.log('__response ' + ciudad + ' location = ', resForecast.data.results[0].geometry.location);
            return resForecast.data.results[0].geometry.location;
        })["catch"](function (err) {
            console.log('__Error en /api/googlemaps/getLatLng/' + ciudad);
            return err;
        });
    }
};
