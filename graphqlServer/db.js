const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  transactions: store.collection('transactions'),
};
