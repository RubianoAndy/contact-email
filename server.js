require('dotenv').config();

const express = require('express');
const sendEmailRequests = require('./routes/send-email');
const bodyParser = require('body-parser');

const PORT = process.env.PORT; // const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/api', sendEmailRequests);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})