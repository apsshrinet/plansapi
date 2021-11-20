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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isplanactive = exports.getplaninfo = exports.getplans = exports.addplan = void 0;
var db_1 = require("../db");
var addplan = function (plan_names, button_value, order_limit, original_pricing, reduced_price, billings, features, req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryString = "INSERT INTO plans (plan_names, button_value, order_limit) VALUES ($1, $2, $3)";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names, button_value, order_limit], function (err, result) {
                        if (err) {
                            console.log("error in plans insertion.....", err);
                            var obj = {
                                statusCode: 400,
                                message: "unsuccessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                    })];
            case 1:
                _a.sent();
                if (!(original_pricing != null && billings != null)) return [3 /*break*/, 3];
                queryString =
                    "INSERT INTO pricing (plan_names, original_pricing, reduced_pricing, billing) VALUES ($1, $2, $3, $4)";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names, original_pricing, reduced_price, billings], function (err, result) {
                        if (err) {
                            console.log("Error in pricing insertion....", err);
                            var obj = {
                                statusCode: 400,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(features.length > 0)) return [3 /*break*/, 7];
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < features.length)) return [3 /*break*/, 7];
                queryString =
                    "INSERT INTO features (plan_names, features) VALUES ($1, $2)";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names, features[i]], function (err, result) {
                        if (err) {
                            console.log("Error in features insertion......", err);
                            var obj = {
                                statusCode: 400,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addplan = addplan;
var getplans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryString = "SELECT plan_names from plans";
                return [4 /*yield*/, db_1.db.query(queryString, function (err, result) {
                        if (err) {
                            console.log("Error in fetching from database", err);
                            var obj = {
                                statusCode: 500,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                        res.send(result.rows);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getplans = getplans;
var getplaninfo = function (plan_names, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, pricing_plans, features_plans, result1, result2, result3, result4, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                queryString = "SELECT plan_names from pricing WHERE pricing.plan_names=$1";
                pricing_plans = 0;
                features_plans = 0;
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 1:
                result1 = _a.sent();
                pricing_plans = result1.rowCount;
                queryString =
                    "SELECT plan_names from features WHERE features.plan_names=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 2:
                result2 = _a.sent();
                features_plans = result2.rowCount;
                return [4 /*yield*/, console.log("feature length.................. ", features_plans)];
            case 3:
                _a.sent();
                return [4 /*yield*/, console.log("pricing_length................... ", pricing_plans)];
            case 4:
                _a.sent();
                if (!(features_plans > 0 && pricing_plans > 0)) return [3 /*break*/, 6];
                queryString =
                    "SELECT plans.plan_names, plans.button_value,plans.order_limit,pricing.original_pricing,pricing.reduced_pricing,pricing.billing,features.features FROM ((plans INNER JOIN pricing ON plans.plan_names = pricing.plan_names)INNER JOIN features ON features.plan_names = plans.plan_names) WHERE plans.plan_names=$1;";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 5:
                result3 = _a.sent();
                res.send(result3.rows);
                return [3 /*break*/, 12];
            case 6:
                if (!(features_plans > 0 && pricing_plans == 0)) return [3 /*break*/, 8];
                queryString =
                    "SELECT plans.plan_names, plans.button_value,plans.order_limit,features.features FROM (plans INNER JOIN pricing ON plans.plan_names = features.plan_names) WHERE plans.plan_names=$1;";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 7:
                result4 = _a.sent();
                res.send(result4.rows);
                return [3 /*break*/, 12];
            case 8:
                if (!(features_plans == 0 && pricing_plans > 0)) return [3 /*break*/, 10];
                queryString =
                    "SELECT plans.plan_names, plans.button_value,plans.order_limit,pricing.original_pricing,pricing.reduced_pricing,pricing.billing FROM (plans INNER JOIN pricing ON plans.plan_names = pricing.plan_names) WHERE plans.plan_names=$1;";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names], function (err, result) {
                        if (err) {
                            console.log(err);
                            var obj = {
                                statusCode: 500,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                            next(err);
                        }
                        console.log(result);
                        res.send(result.rows);
                    })];
            case 9:
                _a.sent();
                return [3 /*break*/, 12];
            case 10:
                queryString = "SELECT * from plans WHERE plans.plan_names = $1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names], function (err, result) {
                        if (err) {
                            console.log("Error in fetching from database", err);
                            var obj = {
                                statusCode: 500,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                        res.send(result.rows);
                    })];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                e_1 = _a.sent();
                throw e_1;
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.getplaninfo = getplaninfo;
var isplanactive = function (plan_names, req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryString = "SELECT * FROM plans WHERE plans.plan_names= &1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names], function (err, result) {
                        if (err) {
                            console.log("Error in features insertion......", err);
                            var obj = {
                                statusCode: 500,
                                message: "Unsucessfull",
                            };
                            res.send(obj);
                        }
                        console.log(result);
                        res.send(result.rows);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.isplanactive = isplanactive;
