/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_lunar_date_time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/lunar-date-time.js */ \"./src/js/lunar-date-time.js\");\n\n\n/**\n * Translate\n * \n * @since 1.0\n * @param {string} key Key to check and translate\n */\nfunction trans(key)\n{\n    let trans = window.trans;\n\n    if(typeof trans === 'undefined') {\n        return key;\n    }\n\n    if(key in trans) {\n        return trans[key];\n    }\n    else\n    {\n        return key;\n    }\n}\n\nvar lunar = new _js_lunar_date_time_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](17, 9, 2021, 0, 0, 0, 7);\n//console.log(lunar);\nconsole.log(lunar.format('d/m/Y H:i:s j z l'));\n\nconsole.log(trans('earthly_stem_0'));\n\n//# sourceURL=webpack://js-lunar-calendar/./src/index.js?");

/***/ }),

/***/ "./src/js/base-converter.js":
/*!**********************************!*\
  !*** ./src/js/base-converter.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"floor\": () => (/* binding */ floor),\n/* harmony export */   \"gregorianToJd\": () => (/* binding */ gregorianToJd),\n/* harmony export */   \"jdToSunlongitude\": () => (/* binding */ jdToSunlongitude)\n/* harmony export */ });\n/**\n * Round down a decimal number\n * \n * @param {float} number \n * @returns \n */\nfunction floor(number)\n{\n    return Math.floor(number);\n}\n\n/**\n * Convert a Gregorian date time to Julian Day count\n * \n * @param   {int} day \n * @param   {int} month \n * @param   {int} Year \n * @param   {int} Hour \n * @param   {int} minute \n * @param   {int} second \n * @returns {float}\n */\nfunction gregorianToJd(day, month, Year, Hour = 0, minute = 0, second = 0)\n{\n    let a, y, m, jd;\n\n\ta   = floor((14 - month) / 12);\n\ty   = Year + 4800 - a;\n\tm   = month + 12 * a - 3;\n\tjd  = day + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - floor(y / 100) + floor(y / 400) - 32045;\n\n\tif (jd < 2299161) {\n\t\tjd = day + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - 32083;\n\t}\n\n    jd += (Hour + minute / 60 + second / 3600) / 24;\n\n\treturn jd;\n}\n\n/**\n * Convert Julian Day Count to Sunlongitude by Degees\n * \n * @param   {float} jd        Julian Day Count\n * @param   {float} timezone  Float timezone, ex: '+0730' should be convert to 7.5\n * @returns {float}\n */\nfunction jdToSunlongitude(jd, timezone = 0)\n{\n    let T, dr, L, G, ec, lambda, sl;\n\n    T      = (jd - 2451545.5 - timezone / 24) / 36525;\n    dr     = Math.PI / 180;\n    L      = 280.460 + 36000.770 * T;\n    G      = 357.528 + 35999.050 * T;\n    ec     = 1.915 * Math.sin(dr * G) + 0.020 * Math.sin(dr * 2 * G);\n    lambda = L + ec;  \n    sl     = lambda - 360 * (floor(lambda / (360)));\n\n    return sl;\n}\n\n\n\n\n//# sourceURL=webpack://js-lunar-calendar/./src/js/base-converter.js?");

/***/ }),

/***/ "./src/js/lunar-date-time.js":
/*!***********************************!*\
  !*** ./src/js/lunar-date-time.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _base_converter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-converter.js */ \"./src/js/base-converter.js\");\n\n\nclass LunarDateTime\n{\n    constructor(d, m, Y, H = 0, i = 0, s = 0, timezone = 0)\n    {\n        this.input = {\n            d: d, m: m, Y:Y, H: H, i: i, s: s, timezone: timezone\n        };\n\n        this.output = this.#getOutput();\n    }\n\n    /**\n     * Get Julian day count of new moon\n     * \n     * @param integer k \n     * @returns integer\n     */\n    #getJdNewMoon(k)\n    {\n        let T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;\n\n        T   = k/1236.85; // Time in Julian centuries from 1900 January 0.5\n        T2  = T * T;\n        T3  = T2 * T;\n        dr  = Math.PI/180;\n        Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;\n        Jd1 = Jd1 + 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr); // Mean new moon\n        M   = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3; // Sun's mean anomaly\n        Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3; // Moon's mean anomaly\n        F   = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3; // Moon's argument of latitude\n        C1  =(0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);\n        C1  = C1 - 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(dr*2*Mpr);\n        C1  = C1 - 0.0004*Math.sin(dr*3*Mpr);\n        C1  = C1 + 0.0104*Math.sin(dr*2*F) - 0.0051*Math.sin(dr*(M+Mpr));\n        C1  = C1 - 0.0074*Math.sin(dr*(M-Mpr)) + 0.0004*Math.sin(dr*(2*F+M));\n        C1  = C1 - 0.0004*Math.sin(dr*(2*F-M)) - 0.0006*Math.sin(dr*(2*F+Mpr));\n        C1  = C1 + 0.0010*Math.sin(dr*(2*F-Mpr)) + 0.0005*Math.sin(dr*(2*Mpr+M));\n\n        if (T < -11) {\n            deltat= 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;\n        } \n        else {\n            deltat= -0.000278 + 0.000265*T + 0.000262*T2;\n        }\n\n        JdNew = Jd1 + C1 - deltat;\n    \n        return JdNew;\n    }\n\n    #getJdLunarNovemberNewMoon(Y) {\n        let jd, off, k, nm, sl;\n        \n        jd      = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.gregorianToJd)(31, 12, Y);\n        off     = jd - 2415021;\n        k       = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)(off / 29.530588853);\n        nm      = this.#getJdNewMoon(k);\n        sl      = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.jdToSunlongitude)(nm, this.timezone) / 30);\n\n        return (sl >= 9)\n                ? this.#getJdNewMoon(k - 1)\n                : nm;\n    }\n\n    #getLeapMonthOffset(a11) \n    {\n        let k, last, i, arc;\n\n        k       = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((a11 - 2415021.076998695) / 29.530588853 + 0.5);\n        last    = 0;\n        i       = 1;\n        arc     = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.jdToSunlongitude)(this.getJdNewMoon(k + i), this.timezone) / 30);\n\n        do {\n            ++i;\n            last = arc;\n            arc  = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.jdToSunlongitude)(this.getJdNewMoon(k + i), this.timezone) / 30);\n            \n        } while(arc != last && i < 14);\n    }\n\n    #getJdNewDay()\n    {\n        let jd = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.gregorianToJd)(\n            this.input.d,\n            this.input.m,\n            this.input.Y\n        );\n\n        if(this.input.H === 23) {\n            ++jd;\n        }\n\n        return jd;\n    }\n\n    #getOutput()\n    {\n        let dayNumber, k, monthStart;\n\n        dayNumber   = this.#getJdNewDay();\n        k           = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((dayNumber - 2415021.076998695) / 29.530588853);\n        monthStart  = this.#getJdNewMoon(k + 1);\n\n        if(monthStart > dayNumber) {\n            monthStart = this.#getJdNewMoon(k);\n        }\n\n        let a11, b11, lunarYear;\n        a11 = this.#getJdLunarNovemberNewMoon(this.input.Y);\n        b11 = a11;\n\n        if(a11 >= monthStart) {\n            lunarYear   = this.input.Y;\n            a11         = this.#getJdLunarNovemberNewMoon(this.input.Y - 1);\n        }\n        else {\n            lunarYear   = this.input.Y + 1;\n            b11         = this.#getJdLunarNovemberNewMoon(this.input.Y + 1);\n        }\n\n        let lunarDay, diff, lunarLeap, lunarMonth, leapMonthDiff;\n        lunarDay    = dayNumber - monthStart + 1;\n        diff        = (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)((monthStart - a11) / 29);\n        lunarLeap   = 0;\n        lunarMonth  = diff + 11;\n\n        if(b11 - a11 > 365) {\n            leapMonthDiff = this.#getLeapMonthOffset(a11);\n\n            if(diff >= leapMonthDiff) {\n                lunarMonth = diff + 10;\n\n                if(diff == leapMonthDiff) {\n                    lunarLeap = 1;\n                }\n            }\n        }\n\n        if(lunarMonth > 12) {\n            lunarMonth -= 12;\n        }\n\n        if(lunarMonth >= 11 && diff < 4) {\n            lunarYear -= 1;\n        }\n\n        let datetime = {\n            d: (0,_base_converter_js__WEBPACK_IMPORTED_MODULE_0__.floor)(lunarDay),\n            m: lunarMonth,\n            Y: lunarYear,\n            l: lunarLeap, \n            j: dayNumber,\n        };\n\n        return datetime;\n    }\n\n    /**\n     * Get Lunar date time\n     * \n     * @param string key \n     * @returns mixed\n     */\n    get(key)\n    {\n        switch(key) {\n            case 'd':\n            case 'D':\n                return this.output.d;\n            \n            case 'm':\n            case 'M':\n                return this.output.m;\n            \n            case 'y':\n            case 'Y':\n                return this.output.Y;\n\n            case 'l':\n                return this.output.l;\n\n            case 'j':\n            case 'J':\n                return this.output.j;\n\n            case 'h':\n            case 'H':\n                return this.input.H;\n            \n            case 'i':\n            case 'I':\n                return this.input.i;\n\n            case 's':\n            case 'S':\n                return this.input.s;\n\n            case 'z':\n            case 'Z':\n                return this.input.timezone;\n\n            default:\n                throw 'Invalid key.';\n        }\n    }\n\n    /**\n     * Format date time\n     * \n     * @param string format EX: d/m/Y, m-d-Y...\n     * @returns string\n     */\n    format(format)\n    {\n        let validKeys = ['d', 'D', 'm', 'M', 'y', 'Y', 'j', 'J', 'h', 'H', 'i', 'I', 's', 'S', 'z', 'Z', 'l'];\n\n        for (const key of validKeys) {\n            if(format.includes(key)) {\n                let replacer = this.get(key);\n                if(key == 'd' || key == 'D' || key == 'm' || key == 'M') {\n                    if(replacer < 10) {\n                        replacer = '0' + replacer;\n                    }\n                }\n\n                do {\n                    format = format.replace(key, replacer);\n                } while (format.includes(key));\n            }\n        }\n\n        return format;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LunarDateTime);\n\n//# sourceURL=webpack://js-lunar-calendar/./src/js/lunar-date-time.js?");

/***/ })

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;