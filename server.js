const express = require('express');
const app = express();
const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { errorHandler } = require('./middleware/errorHandler');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use('/', require('./routes'));


app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongodb.initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database.');
        console.error(err);
    } else {
        console.log('Database initialized');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});