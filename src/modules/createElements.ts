

const createNumber = (
  list: HTMLElement, 
  num: NodeListOf<HTMLTableRowElement>
): void => {
  num = list.querySelectorAll('tr');
  for (let i: number = 0; i < num.length; i++) {
    (num[i].firstChild as HTMLElement).textContent = (i + 1).toString();
  }
};


const createTitle = (): HTMLHeadingElement => {
  const h3 = document.createElement('h3');
  h3.textContent = `Todo App`;
  return h3;
};


const createButtonsGroup = (params: { 
  className: string; 
  type: 'button' | 'submit' | 'reset'; 
  text: string; 
}[]): {btns: HTMLButtonElement[]} => {
  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.textContent = text;
    return button;
  });
  return {
    btns,
  };
};


const createForm = (): HTMLFormElement => {
  const form: HTMLFormElement = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
  <label class="form-group me-3 mb-0">
    <input type="text" class="form-control" placeholder="ввести задачу">
  </label>
  `);
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);
  form.append(...buttonGroup.btns);

  return form;
};


const createTable = (): HTMLDivElement => {
  const tableWrapper: HTMLDivElement   = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table: HTMLTableElement = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  tableWrapper.append(table);
  const thead: HTMLTableSectionElement = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
     </tr>
   `);
  const tbody = document.createElement('tbody');
  (tableWrapper as any).table = table;

  table.append(thead, tbody);
  (table as any).tbody = tbody;

  return tableWrapper;
};


const createRow = (
  obj: {id: string, task: string, status: string}, 
  number: number
): HTMLTableRowElement => {
    number++;
  const tr: HTMLTableRowElement = document.createElement('tr');
  tr.classList.add('table-light');
  const tdNumber: HTMLTableCellElement = document.createElement('td');
  tdNumber.textContent = number.toString();
  tdNumber.setAttribute('id', obj.id);
  const tdTask: HTMLTableCellElement = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = obj.task;
  const tdStatus: HTMLTableCellElement = document.createElement('td');
  tdStatus.textContent = obj.status;
  if (tdStatus.textContent === 'Выполнена') {
    tdTask.style.textDecoration = 'line-through';
  }
  const tdAction: HTMLTableCellElement = document.createElement('td');

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-1',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
  ]);
  tdAction.append(...buttonGroup.btns);
  tr.append(tdNumber, tdTask, tdStatus, tdAction);

  return tr;
};


export default {
  createTitle,
  createButtonsGroup,
  createForm,
  createTable,
  createRow,
  createNumber,
};
