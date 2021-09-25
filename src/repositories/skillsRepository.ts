import { Connection } from 'mysql2/promise';
import { getConnection } from '../connection';
import { ResultSetHeader } from 'mysql2';
import Skill from '../models/Skill';

const skillsRepository = {

    /**
     * Create a skill into its table
     */
    create: async (title: string, votes: number): Promise<Skill | null> => {
        const connection: Connection = await getConnection();
        const sql = 'INSERT INTO wilders.skill SET ?';
        let skill: Skill | null = null;
        try {

            skill = await skillsRepository.findByTitle(title);

            if(!skill) {
                const [result, fields]: [ResultSetHeader, any] = await connection.query({
                    sql,
                    values: { title, votes },
                    rowsAsArray: true
                });
    
                if(result) { // insertion done. There is a result.insertId
                    skill = await skillsRepository.findById(result.insertId);
                }
            }

        } catch(error) {
            console.log(error);
        } finally {
            return skill;
        }
    },
    findById: async (id: number): Promise<Skill | null> => {
        const sql = 'SELECT * FROM wilders.skill WHERE id = ?';
        const connection: Connection = await getConnection(); 
        let skill: Skill | null = null;
        try {

            const [rows, fields]: [Array<any>, any] = await connection.query({
                sql,
                values: [id],
                rowsAsArray: true});

            if(rows && rows[0]) {
                skill = new Skill(rows[0]);
            }

        } catch(error) {
            console.log(error);
        } finally {
            return skill;
        }
    },
    findByTitle: async (title: string): Promise<Skill | null> => {
        const sql = 'SELECT * FROM wilders.skill WHERE title = ?';
        const connection: Connection = await getConnection(); 
        let skill: Skill | null = null;
        try {

            const [rows, fields]: [Array<any>, any] = await connection.query({
                sql,
                values: [title],
                rowsAsArray: true});

            if(rows && rows[0]) {
                skill = new Skill(rows[0]);
            }

        } catch(error) {
            console.log(error);
        } finally {
            return skill;
        }
    },

    // way #2 moved to skillsRepository (way #3 moved to wildersSkillsRepository)
    findByWilderId: async (id: number): Promise<Skill[]> => {
        let skills: Skill[] = [];
        const sql = `SELECT wisk.id_skill, wisk.title, wisk.votes 
                    FROM wilders.wilder_skill as ws
                    INNER JOIN wilders.skill as ON wisk.id_skill = sk.id
                    WHERE id_wilder = ?`;

        const connection = await getConnection();

        try {
            const [rows, fields]: [Array<any>, any] = await connection.query({
                sql,
                values: [id],
                rowsAsArray: true
            });

           skills = rows.map((row) => new Skill(row));

        } catch(error) {
            console.log(error);
        } finally {
            return skills;
        }
    },

    // way #1 methods/operation linkSkillToWilder (way #3 moved to wildersSkillsRepository)
    linkToWilder: async (wilderId: number, skillId: number, votes: number): Promise<boolean> => {
        const sql = 'INSERT INTO wilders.wilder_skill (id_wilder, id_skill, votes) VALUES (?, ?, ?)';
        const connection: Connection = await getConnection();
        let linked: boolean = false;

        try {
            const [result, fields]: [ResultSetHeader, any] = await connection.query({
                sql,
                values: [wilderId, skillId, votes],
                rowsAsArray: true,
            });

            linked = result.affectedRows > 0;
        } catch(error){
            console.log(error);
        } finally {
            return linked;
        }
    },
}

export default skillsRepository;