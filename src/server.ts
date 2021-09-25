import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import wilderController from './controllers/wildersController';
import { handleError } from './middlewares/errorsHandlers';

const app = express();

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