const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 5000;
const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));

server.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);
});
io.disconnectSockets();
io.on('connection', (socket) => {
	console.log(`Connected user`);

	socket.on('sendText', (data) => {
		socket.broadcast.emit('receivedText', data);
	});
});
