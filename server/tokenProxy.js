"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
var lodash_1 = require("lodash");
var tokenx_1 = __importDefault(require("./tokenx"));
var logger = require("./logger");
var fetch = require("node-fetch");
var isOK = function (status) { return [200, 404, 409].includes(status); };
var exchangeToken = new tokenx_1.default().exchangeToken;
function proxy(url) {
    var _this = this;
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var request, response, _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, prepareSecuredRequest(req)];
                case 1:
                    request = _c.sent();
                    return [4 /*yield*/, fetch("".concat(url).concat(req.path), request)];
                case 2:
                    response = _c.sent();
                    if (isOK(response.status)) {
                        logger.info("".concat(response.status, " ").concat(response.statusText, ": ").concat(req.method, " ").concat(req.path));
                    }
                    else {
                        logger.error("".concat(response.status, " ").concat(response.statusText, ": ").concat(req.method, " ").concat(req.path));
                    }
                    _b = (_a = res.status(response.status)).send;
                    return [4 /*yield*/, response.text()];
                case 3: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 4:
                    error_1 = _c.sent();
                    logger.error("Feilet kall (".concat(req.method, " - ").concat(req.path, "): "), error_1);
                    return [2 /*return*/, res.status(500).send('Error')];
                case 5: return [2 /*return*/];
            }
        });
    }); };
}
exports.proxy = proxy;
var prepareSecuredRequest = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, token, accessToken, headers, body, imageTag_1, soeknader;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                authorization = req.headers.authorization;
                token = authorization.split(' ')[1];
                return [4 /*yield*/, exchangeToken(token).then(function (accessToken) { return accessToken; })];
            case 1:
                accessToken = _b.sent();
                headers = __assign(__assign({}, req.headers), { authorization: "Bearer ".concat(accessToken) });
                body = undefined;
                if (!(0, lodash_1.isEmpty)(req.body) && req.method === 'POST') {
                    imageTag_1 = (_a = process.env.NAIS_APP_IMAGE) === null || _a === void 0 ? void 0 : _a.replace(/^.*:(.*)/, '$1');
                    if (req.path === '/api/soeknad') {
                        soeknader = req.body.soeknader.map(function (soeknad) { return (__assign(__assign({}, soeknad), { imageTag: imageTag_1 })); });
                        body = JSON.stringify({ soeknader: soeknader });
                    }
                    else {
                        body = JSON.stringify(req.body);
                    }
                }
                return [2 /*return*/, {
                        method: req.method,
                        body: body,
                        headers: headers,
                    }];
        }
    });
}); };
