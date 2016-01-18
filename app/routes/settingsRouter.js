var EmissionType;

EmissionType = require('../models/Settings/emissionType');

module.exports = function(app, express) {
  var SettingsRouter;
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
  SettingsRouter.post("/emisiuni/types/add", function(req, res) {
    var type;
    type = new EmissionType();
    type._id = req.body.tname;
    return type.save(function(err) {
      if (err) {
        res.send(err);
      }
      return res.json({
        "message": "Gen nou creat"
      });
    });
  });
  return SettingsRouter;
};
