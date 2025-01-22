// server.js
const express = require("express");
const app = express();

const PORT = 3005;

// app.get("/", (req, res) => {
//   console.log("web hok get called");
//   res.send("Hello, Ngrok!");
// });

app.post("/", (req, res) => {
  console.log(
    "======================================================================================="
  );
  console.log(req.body.queryResult.parameters);
  const intentName = req.body.queryResult.intent.displayName;
  console.log("web hok called");
  if (intentName === "track.application - context:ongoing-tracking") {
    const applicationId = req.body.queryResult.parameters.applicationId;

    // Fetch application status from the database
    const status = getApplicationStatus(applicationId); // Simulate backend function

    res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [`Your application status is: ${status}.`],
          },
        },
      ],
    });
  }
});

function getApplicationStatus(applicationId) {
  // Simulated data
  return applicationId === "12345" ? "Approved" : "Under Review";
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
