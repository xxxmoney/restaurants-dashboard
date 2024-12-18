// Setup for libraries and other
import {DateTime} from "luxon";

export function setup() {
    DateTime.prototype.toJSON = function () {
        return this.toFormat('yyyy-MM-dd');
    };
}
