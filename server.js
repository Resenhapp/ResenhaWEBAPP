const { createServer } = require('https');
const { parse } = require('url');
const { join } = require('path');
const { readFileSync } = require('fs');
const next = require('next');

const app = next({ dev: true });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync(join(__dirname, '.cert', 'localhost.key')),
  cert: readFileSync(join(__dirname, '.cert', 'localhost.crt')),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
