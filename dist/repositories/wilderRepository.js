"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WilderSchema = new mongoose_1.Schema({
    wilderName: { type: String, unique: true },
    city: String,
    skills: [{ title: String, votes: Number }],
});
const WilderModel = mongoose_1.model('wilder', WilderSchema);
const wilderRepository = {
    /**
     * Create a wilder document given a name, city and a list of skills.
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Wilder> a Promise
     */
    create: async (wilderName, city, skills) => {
        await WilderModel.init();
        const wilder = new WilderModel({
            wilderName,
            city,
            skills,
        });
        return wilder.save();
    },
    /**
     * Retrieve a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise that contains a single wilder
     */
    find: (id) => {
        return WilderModel.findById(id).exec();
    },
    /**
     * Retrieve all the wilders saved as document (a array of wilders)
     * @returns Promise<Array<Wilder>> a Promise which contains an array of wilders
     */
    findAll: () => {
        return WilderModel.find({}).exec();
    },
    /**
     * Update a wilder into the mongoDB storage, given its id
     * @param {*} id wilder document id
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills an array / a list of skills
     * @returns Promise<Wilder | null> a Promise that contains the updated wilder
     */
    update: async (id, wilderName, city, skills) => {
        await WilderModel.updateOne({ _id: id }, {
            wilderName,
            city,
            skills
        });
        return WilderModel.findById(id).exec();
    },
    /**
     * Delete a wilder from mongoDB storage given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise
     */
    delete: (id) => {
        return WilderModel.findByIdAndDelete(id).exec();
    },
};
exports.default = wilderRepository;
