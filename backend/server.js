const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let dbName = 'shopping_list'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.connection = mongoose.connection;
connection.on('error', () => console.log('Could not connect to DB'));
connection.once('open', () => {
    console.log('Connected to DB');
});

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});