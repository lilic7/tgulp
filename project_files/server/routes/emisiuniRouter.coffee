Emission = require '../models/emission'
EmissionType = require '../models/Settings/emissionType'


module.exports = (app, express) ->
  emisiuniRouter = express.Router()

  emisiuniRouter.get "/", (req, res) ->
    res.render "pages/emission"

  emisiuniRouter.get "/emtypes", (req, res) ->
    EmissionType.find (err, types) ->
      res.json {errorMsg: err} if err
      res.json types

  emisiuniRouter.get '/all', (req, res) ->
      Emission.find (err, emissions) ->
        res.send err if err
        res.json {emissions: emissions}


  emisiuniRouter.use (req, res, next) ->
    if !req.body.name
      res.json {message: "Name is REQUIRED"}
    else if !req.body.type
      res.json {message: "Type is REQUIRED"}
    else if !req.body.first_show_date
      res.json {message: "Date is REQUIRED"}
    else if !req.body.total_time
      res.json {message: "Durata totala nu poate fi egala cu 0"}
    else
      next()
      return


  emisiuniRouter.post "/add", (req, res) ->

    bodyDurations = [req.body.time_1, req.body.time_2, req.body.time_3, req.body.time_4, req.body.time_5]

    emission = new Emission()
    emission.name = req.body.name
    emission.type = req.body.type
    emission.total_duration = req.body.total_time # total time trebuie calculat in Angular
    emission.first_show_date = new Date(req.body.first_show_date)

    #set durations
    durations = new Array()
    setDuration durations, duration for duration in bodyDurations
    emission.durations = durations

    emission.save (err) ->
      res.send err if err
      res.json {message: "emission created"}
      res.redirect ".."




  setDuration = (durationArr, duration) ->
    if typeof duration isnt "undefined"
      durationArr.push duration

    return

  emisiuniRouter