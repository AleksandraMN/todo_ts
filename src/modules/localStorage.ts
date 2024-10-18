

const getStorage = (name: string): any[] => {
  const data: { id: string; task: string; status: string }[] = localStorage.getItem(`${name}`) ?
    JSON.parse(localStorage.getItem(`${name}`) as string) : [];
  return data;
};


const setStorage = (name: string, row: any): void => {
  const data: { id: string; task: string; status: string }[] = getStorage(`${name}`);
  data.push(row);
  localStorage.setItem(`${name}`, JSON.stringify(data));
};


const removeStorage = (el: string, name: string): void => {
  const data: { id: string; task: string; status: string }[] = getStorage(`${name}`);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === `${el}`) {
      data.splice(i, 1);
    }
  }
  localStorage.setItem(`${name}`, JSON.stringify(data));
};


const changeStorage = (el: string, name: string): void => {
  const data: { id: string; task: string; status: string }[] = getStorage(`${name}`);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === `${el}`) {
      data[i].status = 'Выполнена';
    }
  }
  localStorage.setItem(`${name}`, JSON.stringify(data));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
  changeStorage,
};
