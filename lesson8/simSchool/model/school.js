import { randomInt, shuffle } from "../utils/functions.js";

export default class School {
    constructor(students, teachers, admins) {
        this._groupSize = 15;
        this._semesterDuration = randomInt(10, 15);

        const groupCount = Math.ceil(students.length / this._groupSize);
        this._groups = this._createGroups(groupCount);

        this._fillGroups(students, teachers, admins);
    }

    get groupSize() {
        return this._groupSize;
    }

    get semesterDuration() {
        return this._semesterDuration;
    }

    get groups() {
        return this._groups;
    }

    startSemester() {
        for(let lessonNumber = 1; lessonNumber <= this._semesterDuration; lessonNumber++) {
            this._groups.forEach(group => group.admin.holdLessons(group));
        }

        this._finishSemester();
    }

    _finishSemester() {
        this._groups.forEach(group => group.admin.finalize(group, this._semesterDuration));
    }

    _createGroups(count) {
        return Array(count).fill(undefined).map(() => (
            {
                students: [],
                specializations: [],
                teachers: [],
                admin: null,
                isSuccessfullyFinished: null,
            }
        ));
    }

    _fillGroups(students, teachers, admins) {
        this._sortStudents(students);
        this._assignSpecializations(teachers);
        this._assignTeachers(teachers);
        this._assignAdmins(admins);
    }

    _sortStudents(students) {
        students.forEach(student => {
            this._sortingHat(student);
        })
    }

    _sortingHat(student) {
        const groups = this._groups.filter(group => {
            return group.students.length < this._groupSize
        });
        const index = randomInt(0, groups.length - 1);
        groups[index].students.push(student);
    }

    _assignAdmins(admins) {
        this._groups.forEach(group => group.admin = admins[randomInt(0, admins.length - 1)]);
    }

    _assignSpecializations(teachers) {
        const specializations = this._getSpecializations(teachers);
        this._groups.forEach(group => {
            group.specializations = this._getRandomSpecializations(specializations);
        });
    }

    _getSpecializations(teachers) {
        return teachers.reduce((specs, teacher) => {
            if (!specs.includes(teacher.specialization)) {
                specs.push(teacher.specialization);
            }
            return specs;
        }, []);
    }

    _getRandomSpecializations(specializations) {
        const specsLen = specializations.length;
        const newLen = randomInt(Math.ceil(specsLen * .75), specsLen);

        const specs = shuffle(specializations);
        specs.length = newLen;
        return specs;
    }

    _assignTeachers(teachers) {
        this._groups.forEach(group => {
            const specializations = group.specializations;
            group.teachers = specializations.map(spec => {
                const teachersBySpec = teachers.filter(teacher => teacher.specialization === spec);
                return teachersBySpec[randomInt(0, teachersBySpec.length - 1)];
            });
        });
    }
}
