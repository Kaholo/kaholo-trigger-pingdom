const { findTriggers } = require(`./helpers`);
const minimatch = require("minimatch");

function webhookAlert(req, res) {
  let body = req.body;

  if (!body.check_name || !body.check_type) {
    console.log(`Check not found`);
    return res.send(`Check not found`);
  }

  let checkName = body.check_name; //Pingdom check name
  let checkType = body.check_type; //Pingdom check type
  findTriggers(
    body,
    validateTrigger,
    { checkName, checkType },
    req,
    res,
    `webhookAlert`
  );
}

async function validateTrigger(trigger,{ checkName, checkType }) {
  const triggerNamePat = (trigger.params.find((o) => o.name === `namePat`).value || "").trim();
  const triggerCheckType = trigger.params.find((o) => o.name === `checkType`).value || `any`;

  // Check if the trigger check name was provided, and if so check it matches request
  if (triggerNamePat && !minimatch(checkName, triggerNamePat)) {
    throw `Not same check name`;
  }

  // Check that To branch provided - else - consider as any.
  if (triggerCheckType !== `any` && triggerCheckType !== checkType) {
    throw `Not same check type`;
  }

  return true;
}

module.exports = { 
    webhookAlert
};