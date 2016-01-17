module.exports = function(app, express) {
  var ecouRouter;
  ecouRouter = express.Router();
  ecouRouter.get('/', function(req, res) {
    res.send("Program pentru Ecoul Sportului");
  });
  return ecouRouter;
};
