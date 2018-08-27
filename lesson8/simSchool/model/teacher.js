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

            // from https://en.wikipedia.org/wiki/Exponential_distribution
            const lambda = 1 + 1/11; // provide median = 5.5 for 5 scientific works
            const exponentialRandom = -Math.log(Math.random()) / (Math.LN2 * lambda / (this._scientificWorksAmount + 1));
            const mark = Math.min(exponentialRandom, 10);

            student.addMark(this.specialization, mark);
        })
    }
}
