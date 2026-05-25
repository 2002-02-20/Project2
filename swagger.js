const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'API for managing books'
    },
    host: 'project2-x3wt.onrender.com/books',
    schemes: ['https']
};


const outputFile = './swagger.json';
const routes = ["./routes/books.js"];

swaggerAutogen(outputFile, routes, doc);