
import storageModule from './localStorage';
import createModule from './createElements';

const {createRow, createNumber} = createModule;
const {setStorage, removeStorage, getStorage, changeStorage} = storageModule;


export const addNewRow = (
  newRow: { id: string; task: string; status: string }, 
  list: HTMLTableSectionElement, 
  number: number
) => {
  list.append(createRow(newRow, number = 0));
};


export const validateForm = (
  form: HTMLFormElement, 
  input: HTMLInputElement, 
  buttons: NodeListOf<HTMLButtonElement>,
): void => {
  if (input.value === '') {
    buttons[0].setAttribute('disabled', 'true');
  }
  input.addEventListener('input', (e: Event) => {
    if (input.value === '') {
      buttons[0].setAttribute('disabled', 'true');
    } else {
      buttons[0].removeAttribute('disabled');
    }
  });
};

export const formControl = (
  form: HTMLFormElement, 
  list: HTMLElement, 
  name: string, 
  data: { id: string; task: string; status: string }[], 
  number: number, 
  input: HTMLInputElement, 
  buttons: NodeListOf<HTMLButtonElement>,
) => {
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const formData: FormData  = new FormData(e.target as HTMLFormElement);
    const newRow: { 
      task: string; 
      status: string; 
      id: string 
    } = Object.fromEntries(formData) as { task: string; status: string; id: string };
    newRow.task = input.value;
    newRow.status = 'В процессе';
    newRow.id = Math.random().toString().substring(2, 10); // id
    data = getStorage(name);
    list.append(createRow(newRow, number = data.length));
    setStorage(name, newRow);
    form.reset();
    buttons[0].setAttribute('disabled', 'true');
  });
};


export const cleanInput = (
  form: HTMLFormElement, 
  input: HTMLInputElement, 
  buttons: NodeListOf<HTMLButtonElement>,
): void => {
  buttons[1].addEventListener('click', () => {
    input.value === '';
    buttons[0].setAttribute('disabled', 'true');
  });
};


export const deleteModal = (
  list: HTMLElement, 
  data: Array<{ id: string; task: string; status: string }>, 
  name: string, 
  num: NodeListOf<HTMLTableRowElement>, 
  number: number,
): void => {
  list.addEventListener('click', (e: MouseEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    const el: string = (target.parentElement!.parentElement!.childNodes[0] as HTMLElement).id;

    if (target.classList.contains('btn-danger')) {
      target.closest('.table-light')!.remove();
      removeStorage(el, name); 
      createNumber(list, num); 
    }
  });
};


export const completeModal = (
  list: HTMLElement, 
  data: Array<{ id: string; task: string; status: string }>, 
  name: string,
): void => {
  list.addEventListener('click', (e: MouseEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    const el: string = (target.parentElement!.parentElement!.childNodes[0] as HTMLElement).id;

    if (target.classList.contains('btn-success')) {
      (target.parentElement!.parentElement!.
          childNodes[1] as HTMLElement).style.textDecoration = 'line-through';
      (target.parentElement!.parentElement!.
          childNodes[2] as HTMLElement).textContent = 'Выполнена';
      changeStorage(el, name);
    }
  });
};


