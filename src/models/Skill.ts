class Skill {
    id: number;
    title: string = '';
    votes: number = 0;

    constructor (values: [number, string, number]) {
        this.id = values[0];
        this.title = values[1];
    }
};

export default Skill;