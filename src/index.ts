
import {renderToDo, renderRows} from './modules/render';
import storageModule from './modules/localStorage';
import {formControl, validateForm, cleanInput,
  deleteModal, completeModal} from './modules/eventHandling';
import createModule from './modules/createElements';

import './css/bootstrap.min.css';

const {
  createNumber,
} = createModule;

const {
  getStorage,
} = storageModule;


{
  const init = (classApp: string, name: string) => {
    const appContainer: HTMLDivElement = document.querySelector(classApp) as HTMLDivElement;
    appContainer.classList.add('vh-100', 'w-100', 'd-flex',
        'align-items-center', 'justify-content-center', 'flex-column');
    const {
      form,
      list,
    } = renderToDo(appContainer, name);
    const input = form.querySelector('input') as HTMLInputElement;
    const buttons = form.querySelectorAll('button');
    const num = list.querySelectorAll('tr');
    createNumber(list, num);
    validateForm(form, input, buttons);

    const number: number = 0;
    const data = getStorage(name);
    console.log(data);

    renderRows(list, data, number);
    formControl(form, list, name, data, number, input, buttons);
    cleanInput(form, input, buttons);
    deleteModal(list, data, name, num, number);
    completeModal(list, data, name);
  };


  const loadingFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
      let str: string | null = '';
      while (str === '') {
        str = prompt(`Привет! Для входа в программу ToDo ` +
            `необходима авторизация. Напиши свое имя.`, '');
      }
      if (str === null) {
        return;
      } else {
        const name: string  = str;
        console.log(name);

        init('.app-container', `${name}`);
      }
    });
  };
  loadingFunction();
}

