var EmissionDefault, EmissionType, hours;

EmissionType = require('../models/Settings/emissionType');

EmissionDefault = require('../models/Settings/emissionDefault');

hours = new Array();

module.exports = function(app, express) {
  var SettingsRouter, dayTimeObj;
  SettingsRouter = express.Router();
  SettingsRouter.get("/", function(req, res) {
    return res.render('pages/settings');
  });
  SettingsRouter.get("/emisiuni/types", function(req, res) {
    return EmissionType.find(function(err, types) {
      if (err) {
        res.send(err);
      }
      return res.json(types);
    });
  });
  SettingsRouter.post("/emisiuni/types", function(req, res) {
    var type;
    type = new EmissionType();
    type.name = req.body.tname;
    return type.save(function(err) {
      if (err) {
        res.send(err);
      }
      return res.json({
        "message": "Gen nou creat"
      });
    });
  });
  SettingsRouter.get("/emisiuni/defaults", function(req, res) {
    return res.render('pages/default-emission-add');
  });
  SettingsRouter.use(function(req, res, next) {
    var body, i, j, len, ref;
    body = req.body;
    ref = [1, 2, 3, 4, 5, 6, 7];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      dayTimeObj(i, body);
    }
    req.hours = hours;
    hours = {};
    next();
  });
  SettingsRouter.post("/emisiuni/defaults/add", function(req, res) {
    var emDefault;
    emDefault = new EmissionDefault();
    emDefault.defaultName = req.body.defName;
    emDefault.defaultType = req.body.defType;
    emDefault.defaultLength = req.body.defLength;
    return res.json({
      body: req.body,
      hours: req.hours
    });
  });
  dayTimeObj = function(i, body) {
    var daysKey, hourKey;
    hourKey = 'hour_' + i;
    daysKey = 'days_' + i;
    console.log(hourKey + ":  " + typeof body[hourKey]);
    if (body[hourKey] !== 'undefined') {
      return;
    }
    hours.push({
      hour: body[hourKey],
      days: body[daysKey]
    });
  };
  return SettingsRouter;
};
