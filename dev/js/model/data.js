const internals = {};

internals.data = [
  {
    title: 'Todo 1',
    desc: 'Todo 1 Testing',
    dueDate: new Date('12/12/2017'),
    status: 'pending'
  },
  {
    title: 'Todo 2',
    desc: 'Todo 2 Testing',
    dueDate: new Date('12/13/2017'),
    status: 'pending'
  },
  {
    title: 'Todo 3',
    desc: 'Todo 3 Testing',
    dueDate: new Date('11/12/2017'),
    status: 'pending'
  },
  {
    title: 'Todo 4',
    desc: 'Todo 4 Testing',
    dueDate: new Date('09/12/2017'),
    status: 'pending'
  },
  {
    title: 'Todo 5',
    desc: 'Todo 5 Testing',
    dueDate: new Date('12/24/2017'),
    status: 'pending'
  }
];

export const getData = () => internals.data;
