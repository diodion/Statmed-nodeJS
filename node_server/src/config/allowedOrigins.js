require("dotenv").config()

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3030',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3030',
    process.env.FRONT_URL_DEV
];

module.exports = allowedOrigins;