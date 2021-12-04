"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var validation_1 = require("../validation");
var express_1 = require("express");
var plans_controller_1 = require("../controller/plans_controller");
var Joi = __importStar(require("joi"));
var router = (0, express_1.Router)();
exports.router = router;
router.post("/addplan", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var plan_names, button_value, order_limit, place_holder, original_pricing, reduced_price, billings, features, result, err_1, obj_1, a, obj, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside addplan");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                plan_names = req.body.plan_names;
                button_value = req.body.button_value;
                order_limit = req.body.order_limit;
                place_holder = req.body.place_holder || null;
                original_pricing = req.body.original_pricing || null;
                reduced_price = req.body.reduced_price || null;
                billings = req.body.billings || null;
                features = req.body.features || [];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, validation_1.add_plans_schema.validateAsync(req.body)];
            case 3:
                result = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                obj_1 = {
                    statusCode: 400,
                    message: err_1.message,
                };
                res.status(obj_1.statusCode);
                res.send(obj_1);
                return [3 /*break*/, 5];
            case 5:
                console.log("Validated the data");
                return [4 /*yield*/, (0, plans_controller_1.addplan)(plan_names, button_value, order_limit, place_holder, original_pricing, reduced_price, billings, features, req, res)];
            case 6:
                a = _a.sent();
                console.log("Sending the response");
                obj = {
                    statusCode: 200,
                    message: "Successfull",
                    body: a,
                };
                res.send(obj);
                return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get("/getplans", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside getplans");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, plans_controller_1.getplans)(req, res)];
            case 2:
                _a.sent();
                res.status(200);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                res.send(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/planinfo", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var plan_names, result, err_4, obj, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside getplaninfobyname router");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                plan_names = req.query.plan_names;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Joi.string()
                        .required()
                        .validateAsync(req.query.plan_names)];
            case 3:
                result = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                obj = {
                    statusCode: 400,
                    message: err_4.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
                return [3 /*break*/, 5];
            case 5:
                console.log("Validated the search data");
                return [4 /*yield*/, (0, plans_controller_1.getplaninfobyname)(plan_names, req, res, next)];
            case 6:
                _a.sent();
                res.status(200);
                return [3 /*break*/, 8];
            case 7:
                err_5 = _a.sent();
                res.send(err_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.delete("/deleteplan", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var plan_names, result, err_6, obj, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside deleteplan router");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                plan_names = req.query.plan_names;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Joi.string()
                        .required()
                        .validateAsync(req.query.plan_names)];
            case 3:
                result = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                console.log(err_6);
                obj = {
                    statusCode: 400,
                    message: err_6.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
                return [3 /*break*/, 5];
            case 5:
                console.log("Validated the deletion data");
                return [4 /*yield*/, (0, plans_controller_1.deleteplan)(plan_names, req, res, next)];
            case 6:
                _a.sent();
                res.status(200);
                return [3 /*break*/, 8];
            case 7:
                err_7 = _a.sent();
                res.send(err_7);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.put("/updatepricing", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pricing_id, original_pricing, reduced_pricing, billing, err_8, obj, result, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside updatepricing router");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                pricing_id = req.body.id;
                original_pricing = req.body.original_pricing || -1;
                reduced_pricing = req.body.reduced_pricing || -1;
                billing = req.body.billing || "";
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, Joi.string().guid().required().validateAsync(req.body.id)];
            case 3:
                _a.sent();
                return [4 /*yield*/, Joi.number().optional().validateAsync(req.body.original_pricing)];
            case 4:
                _a.sent();
                return [4 /*yield*/, Joi.number().optional().validateAsync(req.body.reduced_pricing)];
            case 5:
                _a.sent();
                return [4 /*yield*/, Joi.string().optional().validateAsync(req.body.billing)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_8 = _a.sent();
                console.log(err_8);
                obj = {
                    statusCode: 400,
                    message: err_8.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
                return [3 /*break*/, 8];
            case 8:
                console.log("Validated the sent data");
                return [4 /*yield*/, (0, plans_controller_1.updatepricing)(pricing_id, original_pricing, reduced_pricing, billing, req, res, next)];
            case 9:
                _a.sent();
                result = {
                    statusCode: 200,
                    message: "Succesfully updated pricing",
                };
                res.status(result.statusCode);
                res.send(result);
                return [3 /*break*/, 11];
            case 10:
                err_9 = _a.sent();
                res.send(err_9);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
router.delete("/deletefeature", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var feature_id, result, err_10, obj, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside deletefeature router");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                feature_id = req.query.feature_id;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Joi.string()
                        .guid()
                        .required()
                        .validateAsync(req.query.feature_id)];
            case 3:
                result = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_10 = _a.sent();
                console.log(err_10);
                obj = {
                    statusCode: 400,
                    message: err_10.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
                return [3 /*break*/, 5];
            case 5:
                console.log("Validated the feature data");
                return [4 /*yield*/, (0, plans_controller_1.deletefeature)(feature_id, req, res, next)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_11 = _a.sent();
                res.send(err_11);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.post("/addfeature", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var plan_name, feature, err_12, obj, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inside addfeature router");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                plan_name = req.body.plan_name;
                feature = req.body.feature;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Joi.string().required().validateAsync(req.body.plan_name)];
            case 3:
                _a.sent();
                return [4 /*yield*/, Joi.string().required().validateAsync(req.body.feature)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_12 = _a.sent();
                console.log(err_12);
                obj = {
                    statusCode: 400,
                    message: err_12.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
                return [3 /*break*/, 6];
            case 6:
                console.log("Validated the feature data");
                return [4 /*yield*/, (0, plans_controller_1.addfeature)(plan_name, feature, req, res, next)];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                e_1 = _a.sent();
                res.send(e_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
