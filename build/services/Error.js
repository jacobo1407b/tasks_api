"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error403 = exports.Error200 = exports.Error500 = exports.Error404 = exports.Error400 = exports.Error401 = exports.ErrorCustom = void 0;
var ErrorCustom = /** @class */ (function () {
    function ErrorCustom() {
    }
    return ErrorCustom;
}());
exports.ErrorCustom = ErrorCustom;
var Error401 = /** @class */ (function (_super) {
    __extends(Error401, _super);
    function Error401(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "401";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = true;
        return _this;
    }
    return Error401;
}(ErrorCustom));
exports.Error401 = Error401;
var Error400 = /** @class */ (function (_super) {
    __extends(Error400, _super);
    function Error400(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "400";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = true;
        return _this;
    }
    return Error400;
}(ErrorCustom));
exports.Error400 = Error400;
var Error404 = /** @class */ (function (_super) {
    __extends(Error404, _super);
    function Error404(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "404";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = true;
        return _this;
    }
    return Error404;
}(ErrorCustom));
exports.Error404 = Error404;
var Error500 = /** @class */ (function (_super) {
    __extends(Error500, _super);
    function Error500(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "500";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = true;
        return _this;
    }
    return Error500;
}(ErrorCustom));
exports.Error500 = Error500;
var Error200 = /** @class */ (function (_super) {
    __extends(Error200, _super);
    function Error200(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "InfoError";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = false;
        return _this;
    }
    return Error200;
}(ErrorCustom));
exports.Error200 = Error200;
var Error403 = /** @class */ (function (_super) {
    __extends(Error403, _super);
    function Error403(data) {
        var _this = _super.call(this) || this;
        var err = Error.apply(_this, [data.message]);
        _this.code = err.name = "403";
        _this.message = data.message,
            _this.stack = data.stack;
        _this.error = true;
        return _this;
    }
    return Error403;
}(ErrorCustom));
exports.Error403 = Error403;
//# sourceMappingURL=Error.js.map