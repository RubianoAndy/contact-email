require('dotenv').config();

const express = require('express');
const sendEmailRequests = require('./routes/send-email');
const bodyParser = require('body-parser');

const PORT = process.env.PORT; // const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/api', sendEmailRequests);

// Para todas las peticiones que no encuentra, se le coloca el 404, es importante dejar al final de todas las peticiones
app.use((request, response) => {
    request.status(404).send('<h1>Error 404</h1>')
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})