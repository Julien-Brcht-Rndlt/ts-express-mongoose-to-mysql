import { getConnection } from '../connection';
import Wilder from '../models/Wilder';
import Skill from '../models/Skill';
import { ResultSetHeader } from 'mysql2';
import { Connection } from 'mysql2/promise';
import WilderSkill from '../models/WilderSkill';
import skillsRepository from './skillsRepository';

const wildersRepository = {
    /**
     * Create a wilder into its table + add new skills + link wilder to the skills.
     * @param {*} wilderName wilder name
     * @param {*} city city
     * @param {*} skills array of skills
     * @returns Promise<Wilder> a Promise
     */
    create: async (wilderName: string, city: string, skills: Skill[]): Promise<Wilder | null> => {
        const sql: string = 'INSERT INTO wilders.wilder (wilderName, city) VALUES (?, ?)';
        const connection = await getConnection();
        let wilder: Wilder | null = null;
        try {
            const [result, fields]: [ResultSetHeader, any] = await connection.query({
                sql,
                values: [wilderName, city],
                rowsAsArray: true
            })

            if(result) {
                wilder = await wildersRepository.find(String(result.insertId));

                if(wilder) {
                    for(const skill of skills) {

                        let skillToLink = await skillsRepository.findByTitle(skill.title);
                        if(!skillToLink){
                            skillToLink = await skillsRepository.create(skill.title, skill.votes);
                            
                        }

                        if(skillToLink){
                            if(await skillsRepository.linkSkillToWilder(wilder.id, skillToLink.id, skill.votes)) {
                                wilder.skills.push(skillToLink);
                            }
                        }
                    }

                }
                
            }

        } catch(error){
            console.log(error);
        } finally {
            return wilder;
        }
    },
    /**
     * Retrieve a wilder given its id
     * @param {*} id wilder document id
     * @returns Promise<Wilder | null> a Promise that contains a single wilder
     */
    find: async (id: string): Promise<Wilder | null> => {
        const sql = 'SELECT * FROM wilders.wilder WHERE id = ?';
        const connection: Connection = await getConnection();
        let wilder: Wilder | null = null;
        try {
            const [rows, fields]: [Array<any>, any] = await connection.query({
                sql,
                values: [id],
                rowsAsArray: true
            });
    
            if(rows[0]) {       
                wilder = new Wilder(rows[0]);
                const skills = await skillsRepository.findByWilderId(wilder.id);
                wilder.skills = skills;
            }

        } catch(error) {
            console.log(error);
        } finally {
            return wilder;
        }
    },
    /**
     * Retrieve all the wilders saved as document (a array of wilders)
     * @returns Promise<Array<Wilder>> a Promise which contains an array of wilders 
     */
    findAll: async (): Promise<Array<Wilder>> => {
        const sql = 'SELECT * FROM wilders.wilder';
        const connection = await getConnection();
        let wilders: Wilder[] = []; 
        try {
            const [rows, fields]: [Array<any>, any] = await connection.query({ 
                sql,
                rowsAsArray: true
            });
            wilders = rows.map<Wilder>((row) => {
                return new Wilder(row);
            });

            for(const wilder of wilders) {
                const skills = await skillsRepository.findByWilderId(wilder.id);
                wilder.skills = skills;
            }

        } catch(error) {
            console.log(error);
        } finally {
            return wilders;
        }
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
    delete: async (id: string): Promise<Wilder | null> => {
        const sql = 'DELETE FROM wilders.wilder WHERE id = ?';
        const connection: Connection = await getConnection();
        let wilder: Wilder | null = null;
        try {

            wilder = await wildersRepository.find(id);

            const [result, fields]: [ResultSetHeader, any] = await connection.query({
                sql,
                values: [id],
                rowsAsArray: true
            });

            if(!result.affectedRows) {
                throw new Error('Delete wilder failed!');
            }

        } catch(error) {
            console.log(error);
        } finally {
            return wilder;
        }
    },
    
};

export default wildersRepository;