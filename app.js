const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import bodyParser from 'body-parser'
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

// Mongo Configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.API_DB);

mongoose.connection.once('open', ()=> {
  console.log("Connected to mongo");
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', function (req, res) {
  res.send("OK!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Listening 4000')
});