// Custom startup file for 20i's Node.js (Passenger) hosting.
// Passenger sets PORT; Next handles every route via its request handler.
// Point 20i's "Startup file" at this, after `npm run build`.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> AW Media site ready on port ${port}`);
  });
});
