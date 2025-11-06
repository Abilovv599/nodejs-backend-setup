import { createServer } from "node:http";
import "dotenv/config";

const server = createServer((_req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello, World!\n");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
