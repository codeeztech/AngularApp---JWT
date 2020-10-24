const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

//require('./routes/role-collection-data').RoleCollection(app); // For mongodb native client
//require('./routes/user-collection-data').UserCollection(app); // For mongodb native client

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongoose database connection established successfully");
});

const rolesRouter = require('./routes/roleRoutes');
const usersRouter = require('./routes/userRoutes');
const flightsRouter = require('./routes/flightRoutes');

app.use('/roles', rolesRouter);
app.use('/users', usersRouter);
app.use('/flights', flightsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});