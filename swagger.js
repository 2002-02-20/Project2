const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'API for managing books and authors.'
    },
    host: 'project2-x3wt.onrender.com',
    basePath: '/',
    schemes: ['https']
};


const outputFile = './swagger.json';
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);