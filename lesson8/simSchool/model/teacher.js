import Actor from "./actor.js";

export default class Teacher extends Actor {
    constructor(name, age, specialization, scientificWorksAmount) {
        super(name, age);
        this._specialization = specialization;
        this._scientificWorksAmount = scientificWorksAmount;
    }

    get specialization() {
        return this._specialization;
    }

    get scientificWorksAmount() {
        return this._scientificWorksAmount;
    }

    markGroup(students) {
        students.forEach(student => {
            if (!student.canVisitLesson()) {
                student.registerTruancy();
                student.addMark(this.specialization, null);
                return;
            }

            const mark = Math.min(this._exponentialRandom(this._scientificWorksAmount), 10);
            student.addMark(this.specialization, mark);
        })
    }

    _exponentialRandom(x) {
        // from https://en.wikipedia.org/wiki/Exponential_distribution
        const lambda = 1 + 1 / 11; // provide median = 5.5 from range [1..10] for x = 5
        return -Math.log(Math.random()) / (Math.LN2 * lambda / (x + 1));
    }
}
