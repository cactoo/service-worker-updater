"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

var ServiceWorkerUpdater = function ServiceWorkerUpdater(setUpdateHandler, _ref) {
  var _this = this;

  var _ref$checkInterval = _ref.checkInterval,
      checkInterval = _ref$checkInterval === void 0 ? DEFAULT_CHECK_INTERVAL : _ref$checkInterval,
      _ref$updateOnLoad = _ref.updateOnLoad,
      updateOnLoad = _ref$updateOnLoad === void 0 ? false : _ref$updateOnLoad;

  _defineProperty(this, "updateInterval", null);

  _defineProperty(this, "registerServiceWorker", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var reg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("registerSW");

            if (!isServer()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            _context.next = 5;
            return navigator.serviceWorker.register("/sw.js");

          case 5:
            reg = _context.sent;

            _this._reloadWindowOnControllerChange();

            _this._checkForSWUpdate(reg);

            if (reg) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            if (reg.waiting) {
              _this._updateReady(reg.waiting); // If updateOnLoad is true, activate worker on route navigation


              if (_this.updateOnLoad) {
                reg.waiting.postMessage({
                  type: "SKIP_WAITING"
                });
              }
            } // If "updatefound" event is fired, it means that there's
            // a new service worker being installed.


            reg.addEventListener("updatefound", function () {
              if (reg.installing) {
                _this._trackInstalling(reg.installing);
              }
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "_reloadWindowOnControllerChange", function () {
    console.log("reloadWindowOnControllerChange");
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      console.log("controllerChange"); // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.

      window.location.reload();
    });
  });

  _defineProperty(this, "_checkForSWUpdate", function (registration) {
    console.log("checkForSWUpdate");
    _this.updateInterval = setInterval(function () {
      registration.update();
    }, _this.checkInterval);
  });

  _defineProperty(this, "_updateReady", function (worker) {
    console.log("_updateReady");

    _this.setUpdateHandler(function () {
      console.log("RUNNING updateHandler"); // Tell the service worker to skipWaiting

      worker.postMessage({
        type: "SKIP_WAITING"
      });

      _this.setUpdateHandler(null);
    });
  });

  _defineProperty(this, "_trackInstalling", function (worker) {
    console.log("_trackInstalling");
    worker.addEventListener("statechange", function () {
      if (["installed", "waiting"].includes(worker.state)) {
        _this._updateReady(worker);
      }
    });
  });

  _defineProperty(this, "doCleanup", function () {
    console.log("doCleanup");
    clearInterval(_this.checkInterval);
  });

  this.setUpdateHandler = setUpdateHandler;
  this.checkInterval = checkInterval;
  this.updateOnLoad = updateOnLoad;
  console.log({
    checkInterval: checkInterval
  });
  this.registerServiceWorker();
};

exports["default"] = ServiceWorkerUpdater;

function isServer() {
  return typeof window === "undefined" || typeof navigator === "undefined" || !navigator.serviceWorker;
}

module.exports = exports.default;