import Skill from './Skill';

export default interface Wilder {
    wilderName: string;
    city: string;
    skills: Array<Skill>;
};