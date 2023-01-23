"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Mixpanel = require("mixpanel");
var MixpanelClient = /** @class */ (function () {
    function MixpanelClient() {
        this.isDevelopment = process.env.NODE_ENV === "development";
        this.mixpanel = Mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", {
            debug: this.isDevelopment
        });
        // if (isDevelopment) {
        //   mixpanel.opt_out_tracking();
        // } else {
        //   mixpanel.opt_in_tracking();
        // }
    }
    MixpanelClient.prototype.track = function (name, data) {
        // TODO: or disable tracking in dev altogether
        var sendName = this.isDevelopment ? "DEV - " + name : name;
        this.mixpanel.track(sendName, __assign(__assign({}, data), { isDevelopment: this.isDevelopment }));
    };
    return MixpanelClient;
}());
exports["default"] = MixpanelClient;
//# sourceMappingURL=mixpanel.js.map