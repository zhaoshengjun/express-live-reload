const express = require("express");
const path = require("path");
const {
    readFileSync
} = require("fs");
const livereload = require("livereload");
const cheerio = require("cheerio");

const server = livereload.createServer();
server.watch(__dirname);

const app = express();
const PORT = 8800;

const SCRIPT = `<script>
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>')
  </script>`;
app.use(/\/index|\/|/, (req, res) => {
    let file = readFileSync("./index.html");
    let doc = cheerio.load(file);
    doc("body").append(SCRIPT);
    res.send(doc.html());
});
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});