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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
else if (process.env.NODE_ENV === "production") {
    app.use((0, morgan_1.default)("tiny"));
}
app.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript!");
});
app.all("*", (req, res) => {
    res.status(404).json({ error: "404 route not found" });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Server running on port ${port}...`);
    console.log(`Server running in ${(_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()} mode.`);
    try {
        yield models_1.db.sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}));
