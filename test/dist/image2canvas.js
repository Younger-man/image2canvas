(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["image2canvas"] = factory();
	else
		root["image2canvas"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n/* \n    @param data: 图片资源 地址或者图片数据\n*/\nfunction loadImage(data){\n    return new Promise((resolve,reject)=>{\n        const image = new Image();\n        if(!(/data:image\\/(jpeg|png|gif);base64.+/.test(data))){\n            //如果数据不是bass64， 为图片设置跨域\n            image.crossOrigin = \"anonymous\"; \n        }\n        function cleanup(){\n            image.onload = null;\n            image.onerror = null;\n        }\n        image.onload = () => {cleanup();resolve(image)}\n        image.onerror = (err) =>{cleanup();reject(err)}\n        image.src = data;\n    });\n}\n\nfunction createCanvas(width,height) {\n    const canvas = document.createElement(\"canvas\");\n    canvas.width = width;\n    canvas.height = height;\n    const ctx = canvas.getContext('2d');\n    // ctx.fillRect(0,0,width,height);\n    // ctx.fill();\n    return {canvas,ctx};\n}\n\n/* \n    @param base :合成图片的背景图\n           ｛\n                url:\"\",\n                width:'',\n                height:'',\n            ｝\n    @param image:需要合成的图片数组\n            [\n                url:\"\",\n                width:'',\n                height:'',\n                sx:'',\n                sy:''\n            ]\n    @param  text: 需要合成的文字数组\n             [\n                 {\n                     content:'',\n                     sx:'',\n                     sy:'',\n                 }\n             ]   \n*/\n\nmodule.exports = async function imageToCanvas(base,image=[],text=[],cb){\n    const {canvas,ctx} = createCanvas(base.width,base.height);\n    try {\n        const baseImage = await loadImage(base.url);\n        ctx.drawImage(baseImage,0,0,base.width,base.height);\n        for(index in image) {\n            const composeImage = await loadImage(image[index].url);\n            ctx.drawImage(composeImage,image[index].sx,image[index].sy,image[index].width,image[index].height);\n        }\n        ctx.textAlign = 'center';   \n        ctx.textBaseline = 'top'; \n        for(index in text) {\n            ctx.fillStyle = text[index].color || \"black\";\n            ctx.font = text[index].font || \"24px sans-serif\";\n            //存在换行符\n            if(/&&/.test(text[index].content)) {\n                var contentLine = text[index].content.split('&&');\n                var fontHeight = text[index].lineHeight || 30;\n                for(line in contentLine) {\n                     var lineY = line * fontHeight + text[index].sy;\n                     ctx.fillText(contentLine[line], text[index].sx, lineY);//\n\n                }\n            }else {\n                 ctx.fillText(text[index].content, text[index].sx, text[index].sy);//\n            }\n        }\n        cb(canvas.toDataURL(\"image/png\"));\n        // loadImage(base.url).then((baseImage)=> {\n        //     console.log(baseImage);\n        //      ctx.drawImage(baseImage,0,0,base.width,base.height);\n        //      cb(canvas.toDataURL(\"image/png\"));\n\n\n        // });\n    }catch(e){\n        cb(e);\n    }\n} \n\n//# sourceURL=webpack://image2canvas/./src/index.js?");

/***/ })

/******/ });
});