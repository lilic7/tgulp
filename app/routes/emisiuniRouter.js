var Emission;

Emission = require('../models/emission');

module.exports = function(app, express) {
  var emisiuniRouter, setDuration;
  emisiuniRouter = express.Router();
  emisiuniRouter.get("/", function(req, res) {
    return res.render("pages/emission");
  });
  emisiuniRouter.get('/all', function(req, res) {
    var emission;
    emission = new Emission();
    return Emission.find(function(err, emissions) {
      if (err) {
        res.send(err);
      }
      return res.json({
        emissions: emissions
      });
    });
  });
  emisiuniRouter.use(function(req, res, next) {
    if (!req.body.name) {
      return res.json({
        message: "Name is REQUIRED"
      });
    } else if (!req.body.type) {
      return res.json({
        message: "Type is REQUIRED"
      });
    } else if (!req.body.first_show_date) {
      return res.json({
        message: "Date is REQUIRED"
      });
    } else if (!req.body.total_time) {
      return res.json({
        message: "Durata totala nu poate fi egala cu 0"
      });
    } else {
      next();
    }
  });
  emisiuniRouter.post("/add", function(req, res) {
    var bodyDurations, duration, durations, emission, i, len;
    bodyDurations = [req.body.time_1, req.body.time_2, req.body.time_3, req.body.time_4, req.body.time_5];
    emission = new Emission();
    emission.name = req.body.name;
    emission.type = req.body.type;
    emission.total_duration = req.body.total_time;
    emission.first_show_date = new Date(req.body.first_show_date);
    durations = new Array();
    for (i = 0, len = bodyDurations.length; i < len; i++) {
      duration = bodyDurations[i];
      setDuration(durations, duration);
    }
    emission.durations = durations;
    return emission.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "emission created"
      });
      return res.redirect("..");
    });
  });
  setDuration = function(durationArr, duration) {
    if (typeof duration !== "undefined") {
      durationArr.push(duration);
    }
  };
  return emisiuniRouter;
};
