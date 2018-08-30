import styles from "./styles/main.css";

import readFile from './scripts/storage';
import { parseCSV } from './scripts/parser';
import model from './scripts/model';
import { render } from './scripts/view';
import { sortFields } from './scripts/config';

const {titles, data} = parseCSV(readFile());

data.sort(model.compareByFields(sortFields, titles));

document.addEventListener('DOMContentLoaded', () => render(data, titles));
