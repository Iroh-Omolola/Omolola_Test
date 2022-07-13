const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 9000;

const app = express();
app.use(cors(), bodyParser.json());

// // graph ql
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
const resolvers = require("./resolvers");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/graphql" }, bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Introduction to graphQl",
  });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
