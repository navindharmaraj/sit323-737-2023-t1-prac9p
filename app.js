var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var path = __dirname + '/views';
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({ includeMethod: true });
const port = 3000;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

var userCount = require('./controller/login_controller')

var loginRouter = require('./route/loginRoute')
var userRouter = require('./route/userRoute')


var userCount = require('./controller/login_controller')

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket)=> {
    console.log('a user connected');

    userCount.getUserCount();

    socket.on('disconnect',() => {
        console.log('user disconnected');
    })
    setInterval(()=>{
        socket.emit('Number', parseInt(Math.random()*10));
    },1000);
});


//Services
// var calculation = require("./services/calculation");
// var car = require("./services/car");
app.use(express.static('assets'));
app.use(cors({
    origin: '*'
}));
app.use(metricsMiddleware);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', metricsMiddleware.metricsContentType);
  res.end(metricsMiddleware.metrics());
});
router.get("/", function (req, res) {
    res.sendFile(path + "/welcome.html");
});

router.get("/admin", function (req, res) {
    res.sendFile(path + "/admin_dashboard.html");
});
router.get("/customers", function (req, res) {
    res.sendFile(path + "/customer.html");
});


app.use("/", router);
app.use("/login", loginRouter);
app.use("/webutil", loginRouter);
app.use("/adminpages", userRouter);
if(!module.parent){
server.listen(port, function () {
    console.log("Live at Port " + port);
});
}
module.exports = server; // for testing