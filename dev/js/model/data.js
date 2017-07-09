const internals = {};

internals.data = [
  {
    id: 'sampletodo1',
    title: 'Todo 1',
    desc: 'Todo 1 Testing',
    dueDate: new Date('12/12/2017'),
    status: 'pending'
  },
  {
    id: 'sampletodo2',
    title: 'Todo 2',
    desc: 'Todo 2 Testing',
    dueDate: new Date('12/13/2017'),
    status: 'completed'
  },
  {
    id: 'sampletodo3',
    title: 'Todo 3',
    desc: 'Todo 3 Testing',
    dueDate: new Date('11/12/2017'),
    status: 'pending'
  },
  {
    id: 'sampletodo4',
    title: 'Todo 4',
    desc: 'Todo 4 Testing',
    dueDate: new Date('09/12/2017'),
    status: 'pending'
  },
  {
    id: 'sampletodo5',
    title: 'Todo 5',
    desc: 'Todo 5 Testing',
    dueDate: new Date('12/24/2017'),
    status: 'pending'
  }
];

export const getData = (key) => {

  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (localStorageData) {

    return localStorageData;
  }

  return internals.data;
};

export const setData = (key, todoObj) => localStorage.setItem(key, JSON.stringify(todoObj));
