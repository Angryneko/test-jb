const fs = require('fs');
const http = require('http');

const port = 8080;

const server = http.createServer(function (req, res) {
	fs.readFile(__dirname + '/files/' + req.url, function (err,data) {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.writeHead(200);
		setTimeout(() => {
			res.end(data);
		}, 2000)
	});
});

server.on('listening', () => console.log(`Server is started on :${port}`));
server.listen(port);