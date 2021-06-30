const minimatch = require("minimatch");

function webhookAlert(req, res, settings, triggerControllers) {
  try { 
    const body = req.body;
    const {check_name, check_type} = body;
    if (!check_name || !check_type){
      return res.status(400).send("Bad Check Format");
    }
    triggerControllers.forEach(trigger => {
        const {namePat, checkType} = trigger.params;
        if (namePat && !minimatch(check_name, namePat)) return;
        if (checkType && checkType !== "any" && checkType !== check_type) return;
        trigger.execute(`${check_name}-${checkType} Check`, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
      res.status(422).send(err.message);
  }
}

module.exports = { 
  webhookAlert
};