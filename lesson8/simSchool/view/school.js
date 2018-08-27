export class SchoolView {
    constructor(school) {
        this._school = school;
    }

    render() {
        const { groups, groupSize, semesterDuration } = this._school;
        const root = document.body;

        const title = 'School Simulator';
        this._renderTitle(title);

        const mainInfo = {
            'group size': groupSize,
            'semester duration': semesterDuration,
            'groups count': groups.length,
        };
        this._renderInfo(mainInfo);

        groups.forEach((group, index) => this._renderGroup(group, index));
    }

    _renderTitle(title) {
        const el = document.createElement('h1');
        el.innerHTML = title;
        document.body.appendChild(el);
    }

    _renderInfo(info) {
        const el = document.createElement('div');
        for (const key in info) {
            el.innerHTML += `<p><strong class="text-capitalize">${key}:</strong> ${info[key]}</p>`
        }
        document.body.appendChild(el);
    }

    _renderGroup(group, index) {
        const el = document.createElement('div');
        el.classList.add('my-5');

        const infoEl = document.createElement('div');
        infoEl.innerHTML = `<h2>Group: ${index + 1}</h2>`;
        infoEl.innerHTML += `<p>Is successfully finished: <strong class="text-uppercase">${group.isSuccessfullyFinished}</strong></p>`;
        el.appendChild(infoEl);

        const adminEl = this._renderAdminData(group);
        el.appendChild(adminEl);

        const specEl = this._renderSpecData(group.specializations);
        el.appendChild(specEl);

        const teachersEl = this._renderTeachersData(group.teachers);
        el.appendChild(teachersEl);

        const studentsEl = this._renderStudentsData(group.students);
        el.appendChild(studentsEl);

        document.body.appendChild(el);
    }

    _renderAdminData(group) {
        const { name, age, truancyMap } = group.admin;
        const el = document.createElement('div');
        el.insertAdjacentHTML('beforeend', '<p>Admin:</p>');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        const theadRow = `<tr>
                            <th>name</th>
                            <th>age</th>
                            <th>truancy</th>
                          </tr>`;
        thead.insertAdjacentHTML('beforeend', theadRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const tbodyRow = `<tr>
                            <td>${name}</td>
                            <td>${age}</td>
                            <td>${truancyMap.get(group)}</td>
                          </tr>`;
        table.insertAdjacentHTML('beforeend', tbodyRow);
        table.appendChild(tbody);

        el.appendChild(table);
        return el;
    }

    _renderSpecData(specs) {
        const el = document.createElement('p');
        el.innerHTML = '<strong>Specialisations:</strong>';
        specs.forEach((spec, index) => el.innerHTML += (index !== 0 ? ',' : '') + ` ${spec}`);
        return el;
    }

    _renderTeachersData(teachers) {
        const el = document.createElement('div');
        el.innerHTML = '<p>Teachers:</p>';
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');

        const thead = document.createElement('thead');
        const titles = `<tr>
                            <th>specialization</th>
                            <th>name</th>
                            <th>age</th>
                            <th>truancy amount</th>
                            <th>scientific works amount</th>
                        </tr>`;
        thead.innerHTML = titles;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        teachers.forEach(teacher => {
            tbody.innerHTML += `<tr>
                                    <td>${teacher.specialization}</td>
                                    <td>${teacher.name}</td>
                                    <td>${teacher.age}</td>
                                    <td>${teacher.truancyAmount}</td>
                                    <td>${teacher.scientificWorksAmount}</td>
                                </tr>`;
        });
        table.appendChild(tbody);

        el.appendChild(table);
        return el;
    }

    _renderStudentsData(students) {
        const el = document.createElement('div');
        el.innerHTML = '<p>Students:</p>';
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');

        const thead = document.createElement('thead');
        const titles = `<tr>
                            <th>name</th>
                            <th>age</th>
                            <th>truancy amount</th>
                            <th>averageMark</th>
                            <th>graduated</th>
                            <th>is superStudent</th>
                        </tr>`;
        thead.innerHTML = titles;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        students.forEach(student => {
            const isGraduated = student.specialNotes.graduated;
            const isSuperStudent = student.specialNotes.superStudent;
            tbody.innerHTML += `<tr class="${isGraduated ? '' : 'table-danger'} ${isSuperStudent ? 'table-success' : ''}">
                                    <td>${student.name}</td>
                                    <td>${student.age}</td>
                                    <td>${student.truancyAmount}</td>
                                    <td>${student.averageMark.toFixed(5)}</td>
                                    <td>${isGraduated || ''}</td>
                                    <td>${isSuperStudent || ''}</td>
                                </tr>`;
        });
        table.appendChild(tbody);

        el.appendChild(table);
        return el;
    }
}