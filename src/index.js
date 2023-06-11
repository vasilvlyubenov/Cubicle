const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const dbConnect = require('./config/dbConfig');

const app = express();
const PORT = 5000;

dbConnect()
    .then(() => console.log('DB Connected successfully.'))
    .catch(err => {
        console.log('DB error:', err);
    });
expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}...`); });