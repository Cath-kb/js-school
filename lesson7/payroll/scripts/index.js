import readFile from './storage.js';
import { parseCSV } from './parser.js';
import model from './model.js';
import { render } from './view.js';
import { sortFields } from './config.js';

const {titles, data} = parseCSV(readFile());

data.sort(model.compareByFields(sortFields, titles));

document.addEventListener('DOMContentLoaded', () => render(data, titles));
