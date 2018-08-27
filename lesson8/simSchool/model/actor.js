export default class Actor {
    constructor(name, age) {
        this._name = name;
        this._age = age;
        this._truancyAmount = 0;
    }

    get name() {
        return this._name;
    }

    get age() {
        return this._age;
    }

    get truancyAmount() {
        return this._truancyAmount;
    }

    canVisitLesson() {
        return Math.random() > .2;
    }

    registerTruancy() {
        this._truancyAmount++;
    }
}
