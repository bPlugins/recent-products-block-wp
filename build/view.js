/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");

// import { createRoot } from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  const wooCommerceRecentProductsEls = document.querySelectorAll(".wp-block-wrp-recent-products");
  wooCommerceRecentProductsEls.forEach(wooCommerceRecentProductsEl => {
    // let attributes = {};
    try {
      // attributes = wooCommerceRecentProductsEl.dataset.attributes
      //   ? JSON.parse(wooCommerceRecentProductsEl.dataset.attributes)
      //   : {};
    } catch (error) {
      // console.error("WRP: failed to parse attributes", error);
    }
    // const {options}=attributes || {}
    // const {theme="default"}=options || {}

    // if(theme === 'advanced'){
    // createRoot(wooCommerceRecentProductsEl).render(
    //   <>
    //     {/* <Style attributes={attributes} id={wooCommerceRecentProductsEl.id}/> */}
    //     <Frontend attributes={"Tanin"}/>
    //     <h1>hello world</h1>

    //   </>
    // );

    // }

    wooCommerceRecentProductsEl?.removeAttribute("data-attributes");
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map