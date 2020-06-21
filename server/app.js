require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const sockets = require('./sockets')(io);
const routes = require("./routes");
const config = require("./routes/config.json");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
 });

app.use("/", routes);
app.use("/", sockets)

app.get("/", (req, res) => {
  res.send(({ ok: 'ok'}))
})

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, config.secret, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

server.listen(process.env.PORT || 8000);

module.exports = app;
