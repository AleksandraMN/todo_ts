
import createModule from './createElements';

const {
  createTitle,
  createButtonsGroup,
  createForm,
  createTable,
  createRow,
} = createModule;


export const renderToDo = (appContainer: HTMLElement, name: string):{ 
  form: HTMLFormElement; 
  tableWrapper: HTMLDivElement; 
  btnDel: HTMLElement; 
  btnComplete: HTMLElement; 
  list: HTMLTableSectionElement; 
} => {
  const title: HTMLElement = createTitle();
  const form: HTMLFormElement = createForm();
  const buttonGroup: {btns:  HTMLButtonElement[]} = createButtonsGroup([
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
  const tableWrapper: HTMLDivElement = createTable();

  appContainer.append(title, form, tableWrapper);
  return {
    form,
    tableWrapper,
    btnDel: buttonGroup.btns[0],
    btnComplete: buttonGroup.btns[1],
    list: tableWrapper.querySelector('tbody') as HTMLTableSectionElement,
  };
};


export const renderRows = (
  elem: HTMLElement, 
  data: {id: string; task: string; status: string}[], 
  number: number
): HTMLElement[] => {
  const allRow: HTMLElement[] = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

