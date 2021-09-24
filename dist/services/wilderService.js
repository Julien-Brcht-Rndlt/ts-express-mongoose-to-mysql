"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wilderRepository_1 = __importDefault(require("../repositories/wilderRepository"));
const wilderService = {
    /**
     * Grab/Get a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise that contains a single wilder
     */
    read: (id) => {
        return wilderRepository_1.default.find(id);
    },
    /**
     * Grab/Gets all the wilders
     * @returns Promise<Array<Wilder>> a Promise which contains an array of wilders
     */
    readAll: () => {
        return wilderRepository_1.default.findAll();
    },
    /**
     * Create a wilder given a name, city and an array/list of skills
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Wilder> a Promise
     */
    create: (wilderName, city, skills) => {
        if (!wilderName || !city) {
            throw new Error('Error: Name and City are required');
        }
        if (wilderName.length <= 3 || wilderName.length > 30) {
            throw new Error('Error: name size must be between 3 and 30 characters');
        }
        return wilderRepository_1.default.create(wilderName, city, skills);
    },
    /**
     * Modify a wilder given its id
     * @param {*} id wilder document id
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills an array / a list of skills
     * @returns Promise<Wilder | null> a Promise that contains the updated wilder
     */
    update: (id, wilderName, city, skills) => {
        if (!wilderName || !city) {
            throw new Error('Error: Name and City are required');
        }
        if (wilderName.length <= 3 || wilderName.length > 30) {
            throw new Error('Error: name size must be between 3 and 30 characters');
        }
        return wilderRepository_1.default.update(id, wilderName, city, skills);
    },
    /**
     * Remove a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise
     */
    delete: (id) => {
        return wilderRepository_1.default.delete(id);
    },
};
exports.default = wilderService;
