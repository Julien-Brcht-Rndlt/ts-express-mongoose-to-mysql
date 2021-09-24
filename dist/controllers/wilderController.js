"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wilderService_1 = __importDefault(require("../services/wilderService"));
const wilderRouter = express_1.default.Router();
/**
 * GET /wilders
 * Retrieve all wilders resources
 */
wilderRouter.get('/', async (req, res, next) => {
    try {
        const wilders = await wilderService_1.default.readAll();
        res.status(200).json(wilders);
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /wilders/:id
 * Retrieve a specific wilder resource, given its id
 */
wilderRouter.get('/:id', async (req, res, next) => {
    try {
        const wilder = await wilderService_1.default.read(req.params.id);
        if (!wilder) {
            throw new Error('Error: Resource Not Found');
        }
        res.status(200).json(wilder);
    }
    catch (error) {
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
wilderRouter.post('/', async (req, res, next) => {
    try {
        const { wilderName, city, skills } = req.body;
        const wilder = await wilderService_1.default.create(wilderName, city, skills);
        res.status(201).json(wilder);
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /wilders/:id
 * Update/Modify a specific wilder resource given its id
 */
wilderRouter.put('/:id', async (req, res, next) => {
    try {
        const { wilderName, city, skills } = req.body;
        const wilder = await wilderService_1.default.update(req.params.id, wilderName, city, skills);
        res.status(200).json(wilder);
    }
    catch (error) {
        next(error);
    }
});
/**
 * DELETE /wilders/:id
 * Delete a wilder resource given its id
 */
wilderRouter.delete('/:id', async (req, res, next) => {
    try {
        await wilderService_1.default.delete(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.default = wilderRouter;
