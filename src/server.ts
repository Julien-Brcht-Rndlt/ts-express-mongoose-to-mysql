import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import wilderController from './controllers/wilderController';
import { handleError } from './middlewares/errorsHandlers';

const app = express();

//init mongodb connection
// connection string: mongodb protocol + db server host + db name
mongoose
    .connect("mongodb://127.0.0.1:27017/wildersdb", { autoIndex: true })
    .then(() => console.log('Connected to wildersdb database'))
    .catch((err) => console.log(`Error while connecting to database: ${err.message}`));

//bypass local API restrictions
app.use(cors()); 
//common required middlewares declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//pre-middleware to display date/time
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`TIME: ${new Date()}`);
    next();
})

//path '/wilders' routing  + controller
app.use('/api/wilders', wilderController);

app.use(handleError);

app.listen(8080, () => console.log('Server started on port 8080'));