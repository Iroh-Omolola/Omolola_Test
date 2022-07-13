const db = require("./db");
const Query = {
  greeting: () => "Introduction to graphQl!",
  myName: (root, args) => myNameMethod(args.name),
  transaction: () => db.transactions.list(),
  searchTransaction: (root, args) => searchTransaction(root, args),
};

const myNameMethod = (name) => `Hello ${name}, welcome to graphQl!`;

const searchTransaction = (root, { input }) => {
  const transactions = db.transactions.list();
  const shouldApplyQueryFilter = input.query !== null;

  if (shouldApplyQueryFilter) {
    const filteredTransaction = transactions.filter((transaction) => {
      return (
        transaction.ID.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Name.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Date.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Sex.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Status.toLowerCase().includes(input.query.toLowerCase())
      );
    });

    return filteredTransaction;
  }
  return transactions
};

module.exports = {
  Query,
};
