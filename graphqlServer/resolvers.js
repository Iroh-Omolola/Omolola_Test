const db = require("./db");
const Query = {
  greeting: () => "Introduction to graphQl!",
  myName: (root, args) => myNameMethod(args.name),
  transaction: () => db.transactions.list(),
  searchTransaction: (root, args) => searchTransaction(root, args),
};

const myNameMethod = (name) => `Hello ${name}, welcome to graphQl!`;

const searchTransaction = (root, { input }) => {
  let transactions = db.transactions.list();
  const shouldApplyQueryFilter = input.query !== null;
  const shouldApplySexFilter = input.sexQuery !== "";
  const shouldApplyStatusFilter = input.statusQuery !== "";
 if (shouldApplySexFilter) {
   transactions=transactions.filter((a) => a.Sex == input.sexQuery);
 }
  if (shouldApplyStatusFilter) {
    transactions = transactions.filter((a) => a.Status == input.statusQuery);
  }
  if (shouldApplyQueryFilter) {
    transactions =transactions.filter((transaction) => {
      return (
        transaction.ID.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Name.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Date.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Sex.toLowerCase().includes(input.query.toLowerCase()) ||
        transaction.Status.toLowerCase().includes(input.query.toLowerCase())
      );
    });
  }

  return transactions
};

module.exports = {
  Query,
};
