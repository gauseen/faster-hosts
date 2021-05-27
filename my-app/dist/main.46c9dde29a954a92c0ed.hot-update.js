webpackHotUpdate("main",{

/***/ "./src/popup/App.tsx":
/*!***************************!*\
  !*** ./src/popup/App.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/_antd@4.15.6@antd/es/index.js");
/* harmony import */ var _components_Editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Editor */ "./src/popup/components/Editor/index.tsx");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Header */ "./src/popup/components/Header/index.tsx");
/* harmony import */ var _components_SideMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SideMenu */ "./src/popup/components/SideMenu/index.tsx");
/* harmony import */ var _components_HostsForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/HostsForm */ "./src/popup/components/HostsForm/index.tsx");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.css */ "./src/popup/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/useStorage */ "./src/popup/hooks/useStorage.ts");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../const */ "./src/const.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/eleme/Desktop/workspace/FasterHosts/my-app/src/popup/App.tsx",
    _s = __webpack_require__.$Refresh$.signature();











const operateTypeName = {
  add: '添加 Hosts',
  edit: '编辑 Hosts'
};

function App() {
  _s();

  const [operateType, setOperateType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('add');
  const [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [content, setContent] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const {
    storage
  } = Object(_hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"])(_const__WEBPACK_IMPORTED_MODULE_8__["HOSTS"]);
  const {
    storage: usingHostsId
  } = Object(_hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"])(_const__WEBPACK_IMPORTED_MODULE_8__["USING_HOSTS_ID"]);
  const {
    storage: activeHostsId
  } = Object(_hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"])(_const__WEBPACK_IMPORTED_MODULE_8__["ACTIVE_HOSTS_ID"]);
  const sideMenuList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return Object.keys(storage).map(id => {
      var _storage$id;

      return {
        id,
        title: (_storage$id = storage[id]) === null || _storage$id === void 0 ? void 0 : _storage$id.title
      };
    });
  }, [storage]);
  const activeHosts = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return storage[activeHostsId || usingHostsId];
  }, [storage, usingHostsId, activeHostsId]);

  const handleAdd = () => {
    setOperateType('add');
    setVisible(true);
  };

  const handleEdit = item => {
    chrome.storage.sync.set({
      [_const__WEBPACK_IMPORTED_MODULE_8__["ACTIVE_HOSTS_ID"]]: item === null || item === void 0 ? void 0 : item.id
    });
    setOperateType('edit');
    setVisible(true);
  };

  const handleChange = item => {
    chrome.storage.sync.set({
      [_const__WEBPACK_IMPORTED_MODULE_8__["ACTIVE_HOSTS_ID"]]: item === null || item === void 0 ? void 0 : item.id
    });
  };

  const readOnly = (activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.hostsType) === _components_HostsForm__WEBPACK_IMPORTED_MODULE_5__["HostsTypeEnum"].REMOTE;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
    className: "faster_hosts",
    id: "faster_hosts",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_components_Header__WEBPACK_IMPORTED_MODULE_3__["default"], {
      readOnly: readOnly,
      title: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.title,
      onAdd: handleAdd
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
      className: "faster_hosts_body",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_components_SideMenu__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: activeHostsId || usingHostsId,
        onEditor: handleEdit,
        onChange: handleChange,
        list: sideMenuList
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_components_Editor__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onChange: r => console.log(r),
        content: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.content,
        readOnly: readOnly
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_1__["Drawer"], {
      placement: "right",
      closable: false,
      visible: visible,
      onClose: () => setVisible(false),
      width: "80%",
      getContainer: "#faster_hosts",
      style: {
        position: 'absolute'
      },
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("h3", {
        children: operateTypeName[operateType]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_components_HostsForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: activeHostsId || usingHostsId,
        type: operateType,
        title: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.title,
        hostsType: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.hostsType,
        remoteUrl: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.remoteUrl,
        updateHostsInterval: activeHosts === null || activeHosts === void 0 ? void 0 : activeHosts.updateHostsInterval
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, this);
}

_s(App, "t7y+12po1TYw9TNKTueoDDnG+bA=", false, function () {
  return [_hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"], _hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"], _hooks_useStorage__WEBPACK_IMPORTED_MODULE_7__["default"]];
});

_c = App;
/* harmony default export */ __webpack_exports__["default"] = (App);

var _c;

__webpack_require__.$Refresh$.register(_c, "App");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.46c9dde29a954a92c0ed.hot-update.js.map