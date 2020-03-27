var _jsxFileName = "C:\\WORK\\service-worker-updater3\\src\\withSWUpdateChecker.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import ServiceWorkerUpdater from "./ServiceWorkerUpdater";
export default function withSWUpdateChecker(WrappedComponent, _ref) {
  var _temp;

  var checkInterval = _ref.checkInterval,
      updateOnLoad = _ref.updateOnLoad;
  return _temp = /*#__PURE__*/function (_Component) {
    _inheritsLoose(_temp, _Component);

    var _super = _createSuper(_temp);

    function _temp() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "state", {
        updateHandler: null,
        updater: null
      });

      _defineProperty(_assertThisInitialized(_this), "setUpdateHandler", function (handler) {
        _this.setState({
          updateHandler: handler
        });
      });

      return _this;
    }

    var _proto = _temp.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var updater = new ServiceWorkerUpdater(this.setUpdateHandler, {
        checkInterval: checkInterval,
        updateOnLoad: updateOnLoad
      });
      this.setState({
        updater: updater
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.state.updater.doCleanup();
    };

    _proto.render = function render() {
      var updateHandler = this.state.updateHandler;
      var hasUpdate = typeof updateHandler === "function";
      return /*#__PURE__*/React.createElement(WrappedComponent, _extends({
        hasUpdate: hasUpdate,
        updateHandler: updateHandler
      }, this.props, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 9
        }
      }));
    };

    return _temp;
  }(Component), _temp;
}