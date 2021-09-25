import express, { Request, Response, NextFunction } from 'express';
import wilderService from '../services/wildersService';
import Wilder from '../models/Wilder';

const wilderRouter = express.Router();

/**
 * GET /wilders
 * Retrieve all wilders resources
 */
wilderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wilders: Array<Wilder> = await wilderService.readAll();
        res.status(200).json(wilders);
    } catch(error) {
        next(error);
    }
});

/**
 * GET /wilders/:id
 * Retrieve a specific wilder resource, given its id
 */
wilderRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wilder: (Wilder | null) = await wilderService.read(req.params.id);
         if(!wilder){
            throw new Error('Error: Resource Not Found');
        }
        res.status(200).json(wilder);
    } catch(error) {
        next(error);
    }
});

/**
 * POST /wilders
 * Create a new wilder resource
 * body:
 * {
 *      "wilderName": string,
 *      "city": string,
 *      "skills": [
 *          {
 *              "title": string,
 *              "votes": number
 *          }
 *      ]
 * }
 */
wilderRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { wilderName, city, skills } = req.body;
        const wilder: Wilder = await wilderService.create(wilderName, city, skills);
        res.status(201).json(wilder);
    } catch(error) {
        next(error);
    }
});

/**
 * PUT /wilders/:id
 * Update/Modify a specific wilder resource given its id
 */
wilderRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { wilderName, city, skills } = req.body;
        const wilder: (Wilder | null) = await wilderService.update(req.params.id, wilderName, city, skills);
        res.status(200).json(wilder);
    } catch(error) {
        next(error);
    }
});

/**
 * DELETE /wilders/:id
 * Delete a wilder resource given its id
 */
wilderRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await wilderService.delete(req.params.id);
        res.sendStatus(204);
    } catch(error) {
        next(error);
    }
});

export default wilderRouter;