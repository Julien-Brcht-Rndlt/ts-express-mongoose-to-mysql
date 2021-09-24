"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const wilderController_1 = __importDefault(require("./controllers/wilderController"));
const errorsHandlers_1 = require("./middlewares/errorsHandlers");
const app = express_1.default();
//init mongodb connection
// connection string: mongodb protocol + db server host + db name
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/wildersdb", { autoIndex: true })
    .then(() => console.log('Connected to wildersdb database'))
    .catch((err) => console.log(`Error while connecting to database: ${err.message}`));
//bypass local API restrictions
app.use(cors_1.default());
//common required middlewares declaration
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//pre-middleware to display date/time
app.use((req, res, next) => {
    console.log(`TIME: ${new Date()}`);
    next();
});
//path '/wilders' routing  + controller
app.use('/api/wilders', wilderController_1.default);
app.use(errorsHandlers_1.handleError);
app.listen(8080, () => console.log('Server started on port 8080'));
