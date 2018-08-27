import Actor from "./actor.js";

export default class Student extends Actor {
    constructor(name, age) {
        super(name, age);
        this._marks = {};
        this._specialNotes = {};
    }

    get specialNotes() {
        return this._specialNotes;
    }

    addMark(specialization, mark) {
        if (!this._marks[specialization]) this._marks[specialization] = [];
        this._marks[specialization].push(mark);
    }

    addNote(key, value) {
        this._specialNotes[key] = value;
    }

    get averageMark() {
        const marksBySpecs = Object.values(this._marks);

        const marksCount = marksBySpecs.reduce((sum, marks) => sum + marks.filter(mark => mark !== null).length, 0);
        const marksSum = marksBySpecs.reduce((sum, marks) => sum + marks.reduce((sum, mark) => sum + mark, 0), 0);

        return marksSum / marksCount;
    }
}
