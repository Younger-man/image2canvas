/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var cleanup = function (image) {
    image.onload = null;
    image.onerror = null;
};
/**
 * 获取图片数据
 * @param data 图片资源 地址或者图片数据
 */
var loadImage = function (data) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        if (!/data:image\/(jpeg|png|gif);base64.+/.test(data)) {
            //如果数据不是bass64， 为图片设置跨域
            image.crossOrigin = 'anonymous';
        }
        image.onload = function () {
            cleanup(image);
            resolve({ image: image, width: image.width, height: image.height });
        };
        image.onerror = function (err) {
            console.log('loadErr', err);
            cleanup(image);
            reject(err);
        };
        image.src = data;
    });
};
/**
 * 初始化宽高
 * @param width number
 * @param height number
 * @returns
 */
var createCanvas = function (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    //getContext() 方法返回一个用于在画布上绘图的环境。 目前只支持2d
    var ctx = canvas.getContext('2d');
    return { canvas: canvas, ctx: ctx };
};
/**
 * 绘制背景图
 */
var drawBackgroundImage = function (ctx, url, scale) {
    if (scale === void 0) { scale = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var baseImage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadImage(url)];
                case 1:
                    baseImage = _a.sent();
                    console.log('baseImage', baseImage);
                    ctx.drawImage(baseImage.image, 0, 0, baseImage.width * scale, baseImage.height * scale);
                    return [2 /*return*/];
            }
        });
    });
};
var drawComponseImage = function (ctx, images, scale) {
    if (images === void 0) { images = []; }
    if (scale === void 0) { scale = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _i, index, composeImage;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = images;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    index = _c;
                    return [4 /*yield*/, loadImage(images[index].url)];
                case 2:
                    composeImage = _d.sent();
                    ctx.drawImage(composeImage.image, images[index].sx * scale, images[index].sy * scale, composeImage.width * scale, composeImage.height * scale);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/**
 * 多行文本绘制
 * @param ctx
 * @param text
 * @param scale
 */
var drawContext = function (ctx, text, scale) {
    if (scale === void 0) { scale = 1; }
    var list = text.content.split('&&');
    var fontHeight = text.lineHeight * scale || 30 * scale;
    list.forEach(function (item, index) {
        var lineY = index * fontHeight + text.sy * scale;
        ctx.fillText(item, text.sx * scale, lineY); //
    });
};
var setCtxProps = function (ctx, key, value) {
    ctx[key] = value;
};

var imageToCanvas = function (base, image, text, scale) {
    if (image === void 0) { image = []; }
    if (text === void 0) { text = []; }
    if (scale === void 0) { scale = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, canvas, ctx_1, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _a = createCanvas(base.width * scale, base.height * scale), canvas = _a.canvas, ctx_1 = _a.ctx;
                    setCtxProps(ctx_1, 'textAlign', 'center');
                    setCtxProps(ctx_1, 'textBaseline', 'top');
                    //绘制背景图
                    _b = base.url;
                    if (!_b) 
                    //绘制背景图
                    return [3 /*break*/, 2];
                    return [4 /*yield*/, drawBackgroundImage(ctx_1, base.url, scale)];
                case 1:
                    _b = (_c.sent());
                    _c.label = 2;
                case 2:
                    // 绘制合成图
                    return [4 /*yield*/, drawComponseImage(ctx_1, image, scale)];
                case 3:
                    // 绘制合成图
                    _c.sent();
                    text.forEach(function (item) {
                        setCtxProps(ctx_1, 'fillStyle', item.color || 'black');
                        setCtxProps(ctx_1, 'font', "".concat(item.fontSize * scale, "px sans-serif") || "".concat(24 * scale, "px sans-serif"));
                        if (/&&/.test(item.content)) {
                            drawContext(ctx_1, item, scale);
                        }
                        else {
                            ctx_1.fillText(item.content, item.sx * scale, item.sy * scale); //
                        }
                    });
                    return [2 /*return*/, canvas.toDataURL('image/png')];
                case 4:
                    e_1 = _c.sent();
                    return [2 /*return*/, e_1];
                case 5: return [2 /*return*/];
            }
        });
    });
};

export { imageToCanvas };
