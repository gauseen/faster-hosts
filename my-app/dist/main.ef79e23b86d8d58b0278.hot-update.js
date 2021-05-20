webpackHotUpdate("main",{

/***/ "./src/popup/components/SideMenu/index.tsx":
/*!*************************************************!*\
  !*** ./src/popup/components/SideMenu/index.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images_editor_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/editor.png */ "./src/popup/images/editor.png");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/popup/components/SideMenu/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/eleme/Desktop/workspace/FasterHosts/my-app/src/popup/components/SideMenu/index.tsx",
    _s = __webpack_require__.$Refresh$.signature();






const SideMenu = props => {
  _s();

  const {
    list,
    defaultValue,
    onChange,
    onEditor
  } = props;
  const [selectedValue, setSelectedValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultValue);

  const handleClick = value => {
    if (value !== selectedValue) {
      value && (onChange === null || onChange === void 0 ? void 0 : onChange(value));
    }

    setSelectedValue(value);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])("ul", {
    className: "side_menu",
    children: list.map(item => {
      const selected = selectedValue === item.value;
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])("li", {
        onClick: () => handleClick(item.value),
        className: `${selected ? 'side_menu_item__selected' : null} side_menu_item`,
        children: [item.text, selected && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])("img", {
          onClick: onEditor,
          className: "side_menu_item_editor",
          src: _images_editor_png__WEBPACK_IMPORTED_MODULE_1__["default"],
          alt: "editor"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 26
        }, undefined)]
      }, item.value, true, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 11
      }, undefined);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, undefined);
};

_s(SideMenu, "d+tMUM6j5CClXmNrrxQ5kwBg9Lk=");

_c = SideMenu;
/* harmony default export */ __webpack_exports__["default"] = (SideMenu);

var _c;

__webpack_require__.$Refresh$.register(_c, "SideMenu");

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

/***/ }),

/***/ "./src/popup/images/editor.png":
/*!*************************************!*\
  !*** ./src/popup/images/editor.png ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ })

})
//# sourceMappingURL=main.ef79e23b86d8d58b0278.hot-update.js.map