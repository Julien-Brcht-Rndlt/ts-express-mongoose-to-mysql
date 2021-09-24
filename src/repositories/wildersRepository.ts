import mongoose, { Schema, model } from 'mongoose';
import connection from '../connection';
import Wilder from '../models/Wilder';
import Skill from '../models/Skill';

const WilderSchema = new Schema<Wilder>({
    wilderName: { type: String, unique: true },
    city: String,
    skills: [{ title: String, votes: Number }],
});
const WilderModel = model<Wilder>('wilder', WilderSchema);

const wilderRepository = {
    /**
     * Create a wilder document given a name, city and a list of skills.
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Wilder> a Promise
     */
    create: async (wilderName: string, city: string, skills: Skill[]): Promise<Wilder> => {
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
    find: (id: string): Promise<Wilder | null> => {
        return WilderModel.findById(id).exec();
    },
    /**
     * Retrieve all the wilders saved as document (a array of wilders)
     * @returns Promise<Array<Wilder>> a Promise which contains an array of wilders 
     */
    findAll: (): Promise<Array<Wilder>> => {
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
    update: async (id: string, wilderName: string, city: string, skills: Skill[]): Promise<Wilder | null> => {
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
    delete: (id: string): Promise<Wilder | null> => {
        return WilderModel.findByIdAndDelete(id).exec();
    },
};

export default wilderRepository;