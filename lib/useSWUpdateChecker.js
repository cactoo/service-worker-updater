"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ServiceWorkerUpdater = _interopRequireDefault(require("./ServiceWorkerUpdater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useSWUpdateChecker = function useSWUpdateChecker(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      checkInterval = _ref.checkInterval,
      updateOnLoad = _ref.updateOnLoad;

  var _useState = (0, _react.useState)(null),
      updateHandler = _useState[0],
      setUpdateHandler = _useState[1];

  (0, _react.useEffect)(function () {
    var setHandler = function setHandler(handler) {
      setUpdateHandler(function () {
        return handler;
      });
    };

    var updater = new _ServiceWorkerUpdater["default"](setHandler, {
      checkInterval: checkInterval
    });
    return function () {
      return updater.doCleanup();
    };
  }, []);
  var hasUpdate = typeof updateHandler === "function";
  return [hasUpdate, updateHandler];
};

var _default = useSWUpdateChecker;
exports["default"] = _default;
module.exports = exports.default;