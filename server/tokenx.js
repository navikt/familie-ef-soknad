"use strict";
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
var openid_client_1 = require("openid-client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var node_jose_1 = require("node-jose");
var logger = require('./logger');
var TokenXClient = /** @class */ (function () {
    function TokenXClient() {
        var _this = this;
        this.tokenxClient = null;
        this.audience = null;
        this.exchangeToken = function (idportenToken) { return __awaiter(_this, void 0, void 0, function () {
            var clientAssertion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createClientAssertion()];
                    case 1:
                        clientAssertion = _a.sent();
                        return [2 /*return*/, this.tokenxClient
                                .grant({
                                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                                token_endpoint_auth_method: 'private_key_jwt',
                                client_assertion: clientAssertion,
                                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                                subject_token: idportenToken,
                                audience: 'dev-gcp:teamfamilie:familie-ef-soknad-api',
                            })
                                .then(function (tokenSet) {
                                return Promise.resolve(tokenSet.access_token);
                            })
                                .catch(function (err) {
                                logger.error('Feil under utveksling av token: ', err);
                                return Promise.reject(err);
                            })];
                }
            });
        }); };
        this.createClientAssertion = function () { return __awaiter(_this, void 0, void 0, function () {
            var now, payload, key, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Math.floor(Date.now() / 1000);
                        payload = {
                            sub: tokenxConfig.clientId,
                            iss: tokenxConfig.clientId,
                            aud: this.audience,
                            jti: (0, uuid_1.v4)(),
                            nbf: now,
                            iat: now,
                            exp: now + 60, // max 120
                        };
                        return [4 /*yield*/, this.asKey(tokenxConfig.privateJwk)];
                    case 1:
                        key = _a.sent();
                        options = {
                            algorithm: 'RS256',
                            header: {
                                kid: key.kid,
                                typ: 'JWT',
                                alg: 'RS256',
                            },
                        };
                        return [2 /*return*/, jsonwebtoken_1.default.sign(payload, key.toPEM(true), options)];
                }
            });
        }); };
        this.asKey = function (jwk) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!jwk)
                    throw Error('JWK Mangler');
                return [2 /*return*/, node_jose_1.JWK.asKey(jwk).then(function (key) {
                        return Promise.resolve(key);
                    })];
            });
        }); };
        this.init = function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenx, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!tokenxConfig.discoveryUrl) {
                            throw new TypeError('Miljøvariabelen "TOKEN_X_WELL_KNOWN_URL må være satt');
                        }
                        return [4 /*yield*/, openid_client_1.Issuer.discover(tokenxConfig.discoveryUrl)];
                    case 1:
                        tokenx = _a.sent();
                        this.audience = tokenx.token_endpoint;
                        logger.info("Discovered TokenX @ ".concat(tokenx.issuer));
                        try {
                            client = new tokenx.Client({
                                client_id: tokenxConfig.clientId,
                                redirect_uris: [tokenxConfig.redirectUri, 'https://familie.dev.nav.no/familie/alene-med-barn/soknad/oauth2/callback'],
                                token_endpoint_auth_method: 'none',
                            });
                            logger.info('Opprettet TokenX client');
                            return [2 /*return*/, Promise.resolve(client)];
                        }
                        catch (err) {
                            logger.error('Feil oppstod under parsing av jwt eller opprettelse av TokenX client', err);
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        logger.info('Setter opp TokenX');
        this.init()
            .then(function (client) {
            _this.tokenxClient = client;
        })
            .catch(function () { return process.exit(1); });
    }
    return TokenXClient;
}());
var tokenxConfig = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientId: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
    redirectUri: 'https://familie.dev.nav.no/familie/alene-med-barn/soknad/oauth2/callback'
};
exports.default = TokenXClient;
