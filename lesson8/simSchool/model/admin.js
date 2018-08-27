import Actor from "./actor.js";
import { randomInt } from "../utils/functions.js";

export default class Admin extends Actor {

    constructor (name, age) {
        super(name, age);
        this._truancyMap = new Map();
    }

    getTruancyByGroup(group) {
        return this._truancyMap.get(group);
    }

    holdLessons(group) {
        group.specializations.forEach(spec => {
            const teachers = group.teachers.filter(teacher => teacher.specialization === spec);
            const teacher = teachers[randomInt(0, teachers.length - 1)];
            const students = group.students;

            if (!this.canVisitLesson()) {
                this.registerTruancy();
                this._registerTruancyForGroup(group);

                this._registerStudentsTruancy(students, spec);
                teacher.registerTruancy();
                return;
            }

            if (!teacher.canVisitLesson()) {
                this._registerStudentsTruancy(students, spec);
                teacher.registerTruancy();
                return;
            }

            teacher.markGroup(students);
        });
    }

    finalize(group, semesterDuration) {
        const adminTruancy = this._truancyMap.get(group);
        const specsCount = group.specializations.length;
        const totalLessonsCount = specsCount * semesterDuration;

        if (adminTruancy > totalLessonsCount * 0.5) {
            group.isSuccessfullyFinished = false;
            return;
        }

        group.isSuccessfullyFinished = true;
        group.students.forEach(student => {
            const avgMark = student.averageMark;

            student.addNote('graduated', avgMark > 10 * 0.5);
            if (avgMark > 10 * 0.8) {
                student.addNote('superStudent', true);
            }
        })
    }

    _registerTruancyForGroup(group) {
        if (!this._truancyMap.has(group)) {
            this._truancyMap.set(group, 0);
        }
        this._truancyMap.set(group, this._truancyMap.get(group) + 1);
    }

    _registerStudentsTruancy(students, spec) {
        students.forEach(student => {
            student.addMark(spec, null);
            student.registerTruancy();
        });
    }
}
