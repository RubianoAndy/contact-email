require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT; // const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})