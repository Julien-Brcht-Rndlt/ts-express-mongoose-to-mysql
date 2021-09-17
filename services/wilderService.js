const wilderDAO = require('../repositories/wilderRepository');

module.exports = {
    read: (id) => {
        return wilderDAO.find(id);
    },
    readAll: () => {
        return wilderDAO.findAll();
    },
    create: (name, city, skills) => {
        return wilderDAO.create(name, city, skills);
    },
    update: (id, name, city, skills) => {
        return wilderDAO.update(id, name, city, skills);
    },
    delete: (id) => {
        return wilderDAO.delete(id);
    },
}