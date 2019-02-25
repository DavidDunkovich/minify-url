const express = require("express");
const bodyParser = require("body-parser");
const database = require("./lokiDatabase");
const path = require('path');
let schedule = require("node-schedule");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("sanitize").middleware);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

let entries = database.initializeDatabase();

app.get("/api/getUrls", (req, res) => {
  res.json(entries.data);
});

app.post("/api/addUrl", (req, res) => {
  const insertResponse = database.insertUrl(entries, req.body.longUrl);
  res.json(insertResponse);
});

app.post("/*", (req, res) => {
  const lookUpResponse = database.findLongUrl(entries, req.body.windowLocation);
  res.json(lookUpResponse);
  res.end();
});

//Check once a day to expire records that haven't been accessed in 14 days
schedule.scheduleJob("* * */23 * * *", () => database.purgeOldRecords(entries));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
