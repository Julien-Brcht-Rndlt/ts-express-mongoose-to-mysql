const wilderRepository = require('../repositories/wilderRepository');

module.exports = {
    /**
     * Grab/Get a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Document<Wilder>> a Promise that contains a single wilder
     */
    read: (id) => {
        return wilderRepository.find(id);
    },
    /**
     * Grab/Gets all the wilders
     * @returns Promise<Array<Document<Wilder>> a Promise which contains an array of wilders 
     */
    readAll: () => {
        return wilderRepository.findAll();
    },
    /**
     * Create a wilder givens a name, city and an array/list of skills
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Document<Wilder>> a Promise
     */
    create: (wilderName, city, skills) => {
        if(!wilderName || !city) {
            throw new Error('Error: Name and City are required');
        }
        if(wilderName.length <= 3 || wilderName.length > 30) {
            throw new Error('Error: name size must be between 3 and 30 characters');
        }
        return wilderRepository.create(wilderName, city, skills);
    },
    /**
     * Modify a wilder given its id
     * @param {*} id wilder document id
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills an array / a list of skills
     * @returns Promise<Document<Wilder>> a Promise that contains the updated wilder
     */
    update: (id, wilderName, city, skills) => {
        if(!wilderName || !city) {
            throw new Error('Error: Name and City are required');
        }
        if(wilderName.length <= 3 || wilderName.length > 30) {
            throw new Error('Error: name size must be between 3 and 30 characters');
        }
        return wilderRepository.update(id, wilderName, city, skills);
    },
    /**
     * Remove a wilder given its id 
     * @param {*} id wilder document id
     * @returns Promise<Document<... a Promise
     */
    delete: (id) => {
        return wilderRepository.delete(id);
    },
};