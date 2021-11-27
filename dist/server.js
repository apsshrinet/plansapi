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
var express_1 = __importStar(require("express"));
var bodyParser = __importStar(require("body-parser"));
var dotenv = __importStar(require("dotenv"));
var db_1 = require("./db");
var plansRouter_1 = require("./routes/plansRouter");
var app = (0, express_1.default)();
dotenv.config();
//databaseinitilization
function database_intilization(res) {
    return __awaiter(this, void 0, void 0, function () {
        var checkcreatetable, existsplantab, createtable, existsfeaturetab, createtable, existspricingtab, createtable, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, db_1.db.connect()];
                case 1:
                    _a.sent();
                    console.log("Successfully connected to database...");
                    checkcreatetable = "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'plans');";
                    return [4 /*yield*/, db_1.db.query(checkcreatetable)];
                case 2:
                    existsplantab = _a.sent();
                    if (existsplantab.rows[0]["exists"] == true) {
                        console.log("Table plans already exists in database");
                    }
                    else {
                        createtable = "CREATE TABLE plans (id uuid PRIMARY KEY,plan_names VARCHAR(255) UNIQUE,button_value VARCHAR(255) NOT NULL, order_limit INTEGER, place_holder VARCHAR(255) ,created_on TIMESTAMPTZ NOT NULL DEFAULT NOW());";
                        db_1.db.query(createtable);
                        console.log("Created table plans");
                    }
                    checkcreatetable =
                        "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'features');";
                    return [4 /*yield*/, db_1.db.query(checkcreatetable)];
                case 3:
                    existsfeaturetab = _a.sent();
                    if (!(existsfeaturetab.rows[0]["exists"] == true)) return [3 /*break*/, 4];
                    console.log("Table features already exists in database");
                    return [3 /*break*/, 6];
                case 4:
                    createtable = "CREATE TABLE features (id uuid PRIMARY KEY,plans_id uuid NOT NULL,features VARCHAR(255) NOT NULL);";
                    return [4 /*yield*/, db_1.db.query(createtable)];
                case 5:
                    _a.sent();
                    console.log("Created table features");
                    _a.label = 6;
                case 6:
                    checkcreatetable =
                        "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pricing');";
                    return [4 /*yield*/, db_1.db.query(checkcreatetable)];
                case 7:
                    existspricingtab = _a.sent();
                    if (!(existspricingtab.rows[0]["exists"] == true)) return [3 /*break*/, 8];
                    console.log("Table pricing already exists in database");
                    return [3 /*break*/, 10];
                case 8:
                    createtable = "CREATE TABLE pricing (id uuid PRIMARY KEY,plans_id uuid NOT NULL,original_pricing INT NOT NULL,reduced_pricing INT, billing VARCHAR(100) NOT NULL);";
                    return [4 /*yield*/, db_1.db.query(createtable)];
                case 9:
                    _a.sent();
                    console.log("Created table pricing");
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_1 = _a.sent();
                    res.send(err_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
database_intilization(express_1.response);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("Hello from express.");
        return [2 /*return*/];
    });
}); });
app.use("/plans", plansRouter_1.router);
app.use(function (res, req, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
        error = new Error("Not found");
        error.status = 404;
        next(error);
        return [2 /*return*/];
    });
}); });
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});
app.listen(process.env.PORT, function () {
    console.log("Node server started running ", process.env.PORT);
});
