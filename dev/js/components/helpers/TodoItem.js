const internals = {};

internals.getItemIndex = (item, dataSet) => {
  return dataSet.findIndex( element  => item.id === element.id);
};

export default internals;
