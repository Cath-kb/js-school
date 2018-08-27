import School from './model/school.js';

import Admin from './model/admin.js';
import Teacher from './model/teacher.js';
import Student from './model/student.js';

import { actorsData } from "./fixtures/actors.js";
import { SchoolView } from "./view/school.js";

const teachers = actorsData
    .filter(actor => actor.type === 'teacher')
    .map(teacher => new Teacher(teacher.name, teacher.age, teacher.specialization, teacher.scientificWorksAmount));

const students = actorsData
    .filter(actor => actor.type === 'student')
    .map(student => new Student(student.name, student.age));

const admins = actorsData
    .filter(actor => actor.type === 'admin')
    .map(admin => new Admin(admin.name, admin.age));

const hogwarts = new School(students, teachers, admins);
hogwarts.startSemester();

new SchoolView(hogwarts).render();

console.log(hogwarts);