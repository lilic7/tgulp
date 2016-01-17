express = require 'express'
app = express()
path = require "path"
morgan = require "morgan"
bodyParser = require 'body-parser'
mongoose = require 'mongoose'

dbConfig = require './config/dbConfig'

stiriRouter = require('./app/routes/stiriRouter')(app, express)
ecouRouter = require('./app/routes/ecouRouter')(app, express)
programRouter = require('./app/routes/programRouter')(app, express)
emisiuniRouter = require('./app/routes/emisiuniRouter')(app, express)

app.use bodyParser.urlencoded {extended: true}
app.use bodyParser.json()

app.use (req, res, next) ->
  res.setHeader 'Access-Control-Allow-Origin', '*'
  res.setHeader 'Access-Control-Allow-Methods', 'GET, POST'
  res.setHeader 'Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization'
  next()
  return

app.use morgan 'dev'

mongoose.connect dbConfig.database

app.use express.static __dirname + "/public"
app.set 'view engine', 'jade'
app.set 'views', path.join __dirname+'/public/app/views'

app.get '/', (req, res) ->
  res.render "pages/test"
  return

# routes configurations
app.use '/stiri', stiriRouter
app.use '/ecou', ecouRouter
app.use '/program', programRouter
app.use '/emisiuni', emisiuniRouter

app.listen 5000
console.log "Listen port 5000"