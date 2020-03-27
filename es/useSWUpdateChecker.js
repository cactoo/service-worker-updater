import React, { useState, useEffect } from "react";
import ServiceWorkerUpdater from "./ServiceWorkerUpdater";

var useSWUpdateChecker = function useSWUpdateChecker(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      checkInterval = _ref.checkInterval,
      updateOnLoad = _ref.updateOnLoad;

  var _useState = useState(null),
      updateHandler = _useState[0],
      setUpdateHandler = _useState[1];

  useEffect(function () {
    var setHandler = function setHandler(handler) {
      setUpdateHandler(function () {
        return handler;
      });
    };

    var updater = new ServiceWorkerUpdater(setHandler, {
      checkInterval: checkInterval
    });
    return function () {
      return updater.doCleanup();
    };
  }, []);
  var hasUpdate = typeof updateHandler === "function";
  return [hasUpdate, updateHandler];
};

export default useSWUpdateChecker;