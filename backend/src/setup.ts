// Setup for libraries and other
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../shared/constants/common.constants";

export function setup() {
    DateTime.prototype.toJSON = function () {
        return this.toFormat(DATE_FORMAT);
    };
}
