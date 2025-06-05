import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from ESM in Node.js 22!\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`ESM server running at http://localhost:${PORT}/`);
});
