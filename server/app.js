const express = require('express');

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

// allow cross-origin request
app.use(cors());

// https://cloud.mongodb.com/v2/5c67ba45c56c989593cad2b2#clusters 我的线上mongodb数据库
mongoose.connect('mongodb+srv://admin:17122864@cluster0-osuwt.mongodb.net/aochwang?retryWrites=true');

mongoose.connection.once('open', () => {
    console.log('connected')
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
   console.log('now listening for requests on port 4000')
});