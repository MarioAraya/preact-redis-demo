import moment from "moment-timezone";

export default {
    getHourTimezoneMomentTz: function(city) {
        return moment().tz(city).format("HH:mm");
    }
}