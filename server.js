const express = require('express');
const app = express();
const mongodb = require('./data/database');
app.use(express.json());
app.use('/', require('./routes'));
app.use(require('./middleware/errorHandler').errorHandler);

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