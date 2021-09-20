const wilderService = require('../services/wilderService');
const wilderRouter = require('express').Router();

/* const handleHttpRequest = (req, res, processHttpRequest, next) => {
    try {
        processHttpRequest(req, res);
    } catch(error) {
        next(error);
    }
} */

/**
 * GET /wilders
 * Retrieve all wilders resources
 */
wilderRouter.get('/', async (req, res, next) => {
    
    /* const handleHttpMethod = async (req, res) => {
        const wilders = await wilderService.readAll();
        res.status(200).json(wilders);
    };

    handleHttpRequest(req, res, handleHttpMethod, next); */
    
    try {
        const wilders = await wilderService.readAll();
        res.status(200).json(wilders);
    } catch(error) {
        next(error);
    }
});

/**
 * GET /wilders/:id
 * Retrieve a specific wilder resource, given its id
 */
wilderRouter.get('/:id', async (req, res, next) => {

    /* const handleHttpMethod = async (req, res) => {
        const wilder = await wilderService.read(req.params.id);
        res.status(200).json(wilder);
    }

    handleHttpRequest(req, res, handleHttpMethod, next); */

    try {
        const wilder = await wilderService.read(req.params.id);
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
wilderRouter.post('/', async (req, res, next) => {

    /* const handleHttpMethod = async (req, res) => {
        const { wilderName, city, skills } = req.body;
        const wilder = await wilderService.create(wilderName, city, skills);
        res.status(201).json(wilder);
    }

    handleHttpRequest(req, res, handleHttpMethod, next); */

    try {
        const { wilderName, city, skills } = req.body;
        const wilder = await wilderService.create(wilderName, city, skills);
        res.status(201).json(wilder);
    } catch(error) {
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
        const wilder = await wilderService.update(req.params.id, wilderName, city, skills);
        res.status(200).json(wilder);
    } catch(error) {
        next(error);
    }
});

/**
 * DELETE /wilders/:id
 * Delete a wilder resource given its id
 */
wilderRouter.delete('/:id', async (req, res, next) => {
    try {
        await wilderService.delete(req.params.id);
        res.sendStatus(204);
    } catch(error) {
        next(error);
    }
});

module.exports = wilderRouter;