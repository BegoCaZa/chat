const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();
const { join } = require('node:path');
const { Server } = require('socket.io');

const { createServer } = require('node:http');
const server = createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: '*', // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio)
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

io.on('connection', sochet => {
  console.log('a user is connected');
});
