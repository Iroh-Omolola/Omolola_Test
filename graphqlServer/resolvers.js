const db = require("./db");
const Query = {
  greeting: () => "Introduction to graphQl!",
  myName: (root, args) => myNameMethod(args.name),
  transaction: () => db.transactions.list(),
  transactionByID: (root, args) => transactionByID(root, args),
  searchTransaction: (root, args) => searchTransaction(root, args),
};

const myNameMethod = (name) => `Hello ${name}, welcome to graphQl!`;

const transactionByID = (root, { ID }) => db.transactions.get(ID);

const searchTransaction = (root, { query }) => {
  const transactions = db.transactions.list();
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.ID.toLowerCase().includes(query.toLowerCase()) ||
      transaction.Name.toLowerCase().includes(query.toLowerCase()) ||
      transaction.Date.toLowerCase().includes(query.toLowerCase()) ||
      transaction.Sex.toLowerCase().includes(query.toLowerCase()) ||
      transaction.Status.toLowerCase().includes(query.toLowerCase())
    );
  });

  return filteredTransactions;
};

module.exports = {
  Query,
};
