export class SchoolView {
    constructor(school) {
        this._school = school;
        this._root = document.body;
    }

    render() {
        const { groups, groupSize, semesterDuration } = this._school;

        this._renderTitle('School Simulator');

        this._renderSchoolInfo({
            'group size': groupSize,
            'semester duration': semesterDuration,
            'groups count': groups.length,
        });

        groups.forEach((group, index) => this._renderGroup(group, index+1));
    }

    _renderTitle(title) {
        const el = document.createElement('h1');
        el.classList.add('my-5');
        el.innerHTML = title;
        this._root.appendChild(el);
    }

    _renderSchoolInfo(info) {
        const el = document.createElement('div');
        for (const key in info) {
            el.innerHTML += `<p><strong class="text-capitalize">${key}:</strong> ${info[key]}</p>`
        }
        this._root.appendChild(el);
    }

    _renderGroup(group, number) {
        const el = document.createElement('div');
        el.classList.add('my-5');

        el.insertAdjacentHTML('beforeend', `<h2>Group: ${number}</h2>`);
        this._renderSpecs(group.specializations, el);
        el.insertAdjacentHTML('beforeend', `<p>Is successfully finished: <strong class="text-uppercase">${group.isSuccessfullyFinished}</strong></p>`);
        this._renderAdmin(group.admin, group.admin.getTruancyByGroup(group), el);
        this._renderTeachers(group.teachers, el);
        this._renderStudents(group.students, el);

        this._root.appendChild(el);
    }

    _renderAdmin(admin, truancy, root) {
        const { name, age } = admin;
        const wrapper = document.createElement('div');
        wrapper.classList.add('row');

        const el = document.createElement('div');
        el.classList.add('col-6');
        el.insertAdjacentHTML('beforeend', '<h3>Admin</h3>');

        const table = this._createTableEl();

        const thead = document.createElement('thead');
        const theadRow = `<tr>
                            <th>name</th>
                            <th class="text-center">age</th>
                            <th class="text-right">truancy</th>
                          </tr>`;
        thead.insertAdjacentHTML('beforeend', theadRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const tbodyRow = `<tr>
                            <td>${name}</td>
                            <td class="text-center">${age}</td>
                            <td class="text-right">${truancy}</td>
                          </tr>`;
        table.insertAdjacentHTML('beforeend', tbodyRow);
        table.appendChild(tbody);

        el.appendChild(table);
        wrapper.appendChild(el);
        root.appendChild(wrapper);
    }

    _renderSpecs(specs, root) {
        const el = document.createElement('p');
        el.innerHTML = `<strong>Specialisations:</strong> ${specs.join(', ')}`;
        root.appendChild(el);
    }

    _renderTeachers(teachers, root) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('row');
        const el = document.createElement('div');
        el.classList.add('col-8');
        el.innerHTML = '<h3>Teachers</h3>';

        const table = this._createTableEl();

        const thead = document.createElement('thead');
        const titles = `<tr>
                            <th>specialization</th>
                            <th>name</th>
                            <th class="text-center">age</th>
                            <th class="text-center">truancy amount</th>
                            <th class="text-right">scientific works</th>
                        </tr>`;
        thead.innerHTML = titles;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        teachers.forEach(teacher => {
            tbody.innerHTML += `<tr>
                                    <td>${teacher.specialization}</td>
                                    <td>${teacher.name}</td>
                                    <td class="text-center">${teacher.age}</td>
                                    <td class="text-center">${teacher.truancyAmount}</td>
                                    <td class="text-right">${teacher.scientificWorksAmount}</td>
                                </tr>`;
        });
        table.appendChild(tbody);

        el.appendChild(table);
        wrapper.appendChild(el);
        root.appendChild(wrapper);
    }

    _renderStudents(students, root) {
        const el = document.createElement('div');
        el.innerHTML = '<h3>Students</h3>';
        const table = this._createTableEl();

        const thead = document.createElement('thead');
        const titles = `<tr>
                            <th>name</th>
                            <th class="text-center">age</th>
                            <th class="text-center">truancy amount</th>
                            <th class="text-center">average mark</th>
                            <th class="text-center">graduated</th>
                            <th class="text-right">is Super Student</th>
                        </tr>`;
        thead.innerHTML = titles;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        students.forEach(student => {
            const isGraduated = student.specialNotes.graduated;
            const isSuperStudent = student.specialNotes.superStudent;

            tbody.innerHTML += `<tr class="${isGraduated ? '' : 'table-danger'} ${isSuperStudent ? 'table-success' : ''}">
                                    <td>${student.name}</td>
                                    <td class="text-center">${student.age}</td>
                                    <td class="text-center">${student.truancyAmount}</td>
                                    <td class="text-center">${student.averageMark.toFixed(5)}</td>
                                    <td class="text-center">${isGraduated || ''}</td>
                                    <td class="text-right">${isSuperStudent || ''}</td>
                                </tr>`;
        });
        table.appendChild(tbody);

        el.appendChild(table);
        root.appendChild(el);
    }

    _createTableEl() {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');
        return table;
    }
}