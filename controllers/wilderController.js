const wilderService = require('../services/wilderService');
const wilderRouter = require('express').Router();

wilderRouter.get('/', (req, res) => {
    wilderService.readAll()
        .then((results) => res.status(200).json(results))
        .catch((err) => res.status(500).json({ "message": err.message }));
});

wilderRouter.get('/:id', (req, res) => {
    wilderService.read(req.params.id)
        .then((result) => res.status(200).json(results))
        .catch((err) => res.status(500).json({ "message": err.message }));
});

wilderRouter.post('/', (req, res) => {
    const { name, city, skills } = req.body;
    wilderService.create(name, city, skills)
        .then((result) => res.status(201).json(result))
        .catch((err) => res.status(500).json({ "error": err.message }));
});

wilderRouter.put('/:id', (req, res) => {
    const { name, city, skills } = req.body;
    wilderService.update(name, city, skills)
        .then(res.status(204).json({
            id,
            ...req.body,
        }))
        .catch((err) => res.status(500).json({ "error": err.message }))
});

wilderRouter.delete('/:id', (req, res) => {
    wilderService.delete(req.params.id)
        .then(res.status(204))
        .catch((err) => res.status(500).json({ "error": err.message }));
});

module.exports = wilderRouter;