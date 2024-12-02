const express = require('express');
const bodyParser = require('body-parser');
const hospedeRoutes = require('./routes/hospedeRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/hospedes', hospedeRoutes);
app.use('/login', loginRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

module.exports = app;