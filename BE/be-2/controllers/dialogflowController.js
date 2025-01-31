const { getMainMenuOptions } = require("../utils/dialogflowHelper");
const db = require("../db/dbConfig");

exports.handleDialogflowWebhook = async (req, res) => {
  try {
    const queryResult = req.body.queryResult;
    if (!queryResult) throw new Error("Missing queryResult in request.");

    const intentName = queryResult.intent.displayName;
    console.log("Intent:", intentName);

    if (intentName === "track.application - context:ongoing-tracking") {
      const applicationId = queryResult.parameters.applicationId;
      if (!applicationId) throw new Error("Missing applicationId.");

      const status = await getApplicationStatus(applicationId);
      res.json({
        fulfillmentMessages: [
          { text: { text: [`Your application status is: ${status}.`] } },
          {
            payload: {
              richContent: [[{ type: "chips", options: getMainMenuOptions() }]],
            },
          },
        ],
      });
    } else {
      res.status(400).send("Unhandled intent.");
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res
      .status(500)
      .json({
        fulfillmentMessages: [{ text: { text: [`Error: ${error.message}`] } }],
      });
  }
};
