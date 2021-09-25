import wilderRepository from '../repositories/wildersRepository';
import Wilder from '../models/Wilder';
import Skill from '../models/Skill';

const wilderService = {
    /**
     * Grab/Get a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise that contains a single wilder
     */
    read: (id: string): Promise<Wilder | null> => {
        return wilderRepository.find(id);
    },
    /**
     * Grab/Gets all the wilders
     * @returns Promise<Array<Wilder>> a Promise which contains an array of wilders 
     */
    readAll: (): Promise<Array<Wilder>> => {
        return wilderRepository.findAll();
    },
    /**
     * Create a wilder given a name, city and an array/list of skills
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Wilder> a Promise
     */
    create: (wilderName: string, city: string, skills: Array<Skill>): Promise<Wilder | null> => {
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
     * @returns Promise<Wilder | null> a Promise that contains the updated wilder
     */
    update: (id: string, wilderName: string, city: string, skills: Skill[]): Promise<Wilder | null> => {
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
     * @returns Promise<Wilder | null> a Promise
     */
    delete: (id: string): Promise<Wilder | null> => {
        return wilderRepository.delete(id);
    },
};

export default wilderService;