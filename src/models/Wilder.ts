import Skill from './Skill';

export default class Wilder {
    id: number;
    wilderName: string = '';
    city: string = '';
    skills: Array<Skill> = [];

    constructor(values: any[]) {
        this.id = typeof values[0] === 'string' ? parseInt(values[0]) : values[0];
        this.wilderName = values[1];
        this.city = values [2];
    }
};