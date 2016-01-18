var app, bodyParser, dbConfig, ecouRouter, emisiuniRouter, express, mongoose, morgan, path, programRouter, settingsRouter, stiriRouter;

express = require('express');

app = express();

path = require("path");

morgan = require("morgan");

bodyParser = require('body-parser');

mongoose = require('mongoose');

dbConfig = require('./config/dbConfig');

stiriRouter = require('./app/routes/stiriRouter')(app, express);

ecouRouter = require('./app/routes/ecouRouter')(app, express);

programRouter = require('./app/routes/programRouter')(app, express);

emisiuniRouter = require('./app/routes/emisiuniRouter')(app, express);

settingsRouter = require('./app/routes/settingsRouter')(app, express);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

mongoose.connect(dbConfig.database);

app.use(express["static"](__dirname + "/public"));

app.set('view engine', 'jade');

app.set('views', path.join(__dirname + '/public/app/views'));

app.get('/', function(req, res) {
  res.render("pages/layout");
});

app.use('/stiri', stiriRouter);

app.use('/ecou', ecouRouter);

app.use('/program', programRouter);

app.use('/emisiuni', emisiuniRouter);

app.use('/settings', settingsRouter);

app.listen(5000);

console.log("Listen port 5000");
