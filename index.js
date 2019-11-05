const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors());

dotenv.config();

// Mongo Configuration

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true
  });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', function (req, res) {
  res.send("OK!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(port)
});