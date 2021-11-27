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
exports.addfeature = exports.deletefeature = exports.updatepricing = exports.deleteplan = exports.getplaninfobyname = exports.getplans = exports.addplan = void 0;
var db_1 = require("../db");
var uuid_1 = require("uuid");
var addplan = function (plan_names, button_value, order_limit, place_holder, original_pricing, reduced_price, billings, features, req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, plansid, queryString, result, i, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                id = (0, uuid_1.v4)();
                plansid = id;
                queryString = "INSERT INTO plans (id,plan_names, button_value, order_limit, place_holder) VALUES ($1, $2, $3, $4, $5)";
                return [4 /*yield*/, db_1.db.query(queryString, [
                        id,
                        plan_names,
                        button_value,
                        order_limit,
                        place_holder
                    ])];
            case 1:
                result = _a.sent();
                console.log(result);
                if (!(original_pricing != null && billings != null)) return [3 /*break*/, 3];
                id = (0, uuid_1.v4)();
                queryString =
                    "INSERT INTO pricing (id,plans_id, original_pricing, reduced_pricing, billing) VALUES ($1, $2, $3, $4, $5)";
                return [4 /*yield*/, db_1.db.query(queryString, [
                        id,
                        plansid,
                        original_pricing,
                        reduced_price,
                        billings,
                    ])];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(features.length > 0)) return [3 /*break*/, 7];
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < features.length)) return [3 /*break*/, 7];
                id = (0, uuid_1.v4)();
                queryString =
                    "INSERT INTO features (id,plans_id, features) VALUES ($1, $2, $3)";
                return [4 /*yield*/, db_1.db.query(queryString, [id, plansid, features[i]])];
            case 5:
                _a.sent();
                console.log(result);
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                res.send(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.addplan = addplan;
var getplans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queryString = "SELECT plan_names from plans";
                return [4 /*yield*/, db_1.db.query(queryString)];
            case 1:
                result = _a.sent();
                console.log(result);
                res.send(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getplans = getplans;
var getplaninfobyname = function (plan_names, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result1, result, planid, result2, result3, result4, final_result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                queryString = "SELECT id FROM plans WHERE plan_names=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 1:
                result1 = _a.sent();
                if (result1.rowCount != 1) {
                    result = {
                        statusCode: 404,
                        message: "No Such plan exist",
                    };
                    res.status(result.statusCode);
                    res.send(result);
                }
                planid = result1.rows[0]["id"];
                queryString =
                    "SELECT id, plan_names, button_value, order_limit,place_holder, created_on FROM plans WHERE id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 2:
                result2 = _a.sent();
                queryString =
                    'SELECT id as "pricing_id", original_pricing, reduced_pricing, billing FROM pricing WHERE plans_id=$1';
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 3:
                result3 = _a.sent();
                queryString =
                    'SELECT id as "feature_id", features FROM features WHERE plans_id=$1';
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 4:
                result4 = _a.sent();
                final_result = {
                    plans: result2.rows,
                    pricing: result3.rows,
                    features: result4.rows,
                };
                res.status(200);
                res.send(final_result);
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                res.send(e_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getplaninfobyname = getplaninfobyname;
var deleteplan = function (plan_names, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result1, result_1, planid, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                queryString = "SELECT id FROM plans WHERE plan_names=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_names])];
            case 1:
                result1 = _a.sent();
                if (result1.rowCount != 1) {
                    result_1 = {
                        statusCode: 404,
                        message: "No Such plan exist",
                    };
                    res.status(result_1.statusCode);
                    res.send(result_1);
                }
                planid = result1.rows[0]["id"];
                queryString = "DELETE FROM plans WHERE id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 2:
                _a.sent();
                queryString = "DELETE FROM pricing WHERE plans_id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 3:
                _a.sent();
                queryString = "DELETE FROM features WHERE plans_id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [planid])];
            case 4:
                _a.sent();
                result = {
                    statusCode: 200,
                    message: "Successfully deleted all the data",
                };
                res.status(result.statusCode);
                res.send(result);
                return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                res.send(e_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteplan = deleteplan;
var updatepricing = function (pricing_id, original_pricing, reduced_pricing, billing, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result1, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                queryString = "SELECT id FROM pricing WHERE id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [pricing_id])];
            case 1:
                result1 = _a.sent();
                if (result1.rowCount != 1) {
                    result = {
                        statusCode: 404,
                        message: "No Such pricing exist",
                    };
                    res.status(result.statusCode);
                    res.send(result);
                }
                if (!(original_pricing != -1)) return [3 /*break*/, 3];
                queryString = "UPDATE pricing SET original_pricing = $1 WHERE id = $2;";
                return [4 /*yield*/, db_1.db.query(queryString, [original_pricing, pricing_id])];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(reduced_pricing != -1)) return [3 /*break*/, 5];
                queryString = "UPDATE pricing SET reduced_pricing = $1 WHERE id = $2;";
                return [4 /*yield*/, db_1.db.query(queryString, [reduced_pricing, pricing_id])];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!(billing != '')) return [3 /*break*/, 7];
                queryString = "UPDATE pricing SET billing = $1 WHERE id = $2;";
                return [4 /*yield*/, db_1.db.query(queryString, [billing, pricing_id])];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(500);
                res.send(e_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.updatepricing = updatepricing;
var deletefeature = function (feature_id, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queryString = "DELETE FROM features WHERE id=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [feature_id])];
            case 1:
                _a.sent();
                result = {
                    statusCode: 200,
                    message: "Succesfully deleted the given data"
                };
                res.status(result.statusCode);
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                res.send(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletefeature = deletefeature;
var addfeature = function (plan_name, feature, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString, result1, result_2, planid, id, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                queryString = "SELECT id FROM plans WHERE plan_names=$1";
                return [4 /*yield*/, db_1.db.query(queryString, [plan_name])];
            case 1:
                result1 = _a.sent();
                if (result1.rowCount != 1) {
                    result_2 = {
                        statusCode: 404,
                        message: "No Such plan exist",
                    };
                    res.status(result_2.statusCode);
                    res.send(result_2);
                }
                planid = result1.rows[0]["id"];
                id = (0, uuid_1.v4)();
                queryString =
                    "INSERT INTO features (id,plans_id, features) VALUES ($1, $2, $3)";
                return [4 /*yield*/, db_1.db.query(queryString, [id, planid, feature])];
            case 2:
                _a.sent();
                result = {
                    statusCode: 200,
                    message: "succesfully inserted feature",
                };
                res.status(result.statusCode);
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.send(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addfeature = addfeature;
