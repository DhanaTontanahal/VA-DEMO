const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3005;

// Middleware to parse JSON request body
app.use(express.json());

function getApplicationStatus(applicationId) {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT status 
        FROM application_status 
        WHERE application_id = ?;
      `;

    db.query(query, [applicationId], (err, results) => {
      if (err) {
        return reject(err); // Handle query errors
      }

      if (results.length === 0) {
        resolve("Not Found"); // If no results, return "Not Found"
      } else {
        resolve(results[0].status); // Return the status from the database
      }
    });
  });
}

/*
function getApplicationStatus(applicationId) {
  // Example of a simulated database lookup
  const mockDatabase = {
    2122: "In Progress",
    1234: "Approved",
    5678: "Rejected",
  };

  return mockDatabase[applicationId] || "Not Found";
}
  */
/*
const transactions = [
  {
    transaction_id: 1,
    user_id: 1,
    transaction_type: "Shopping",
    transaction_amount: 120.5,
    transaction_datetime: "2023-01-15 10:45:30",
  },
  {
    transaction_id: 2,
    user_id: 1,
    transaction_type: "Pay Bill",
    transaction_amount: 85.2,
    transaction_datetime: "2023-02-12 14:30:45",
  },
  {
    transaction_id: 3,
    user_id: 1,
    transaction_type: "Refund",
    transaction_amount: 45.0,
    transaction_datetime: "2023-03-20 11:15:25",
  },
  {
    transaction_id: 4,
    user_id: 1,
    transaction_type: "Shopping",
    transaction_amount: 200.0,
    transaction_datetime: "2023-04-01 12:25:35",
  },
  {
    transaction_id: 5,
    user_id: 1,
    transaction_type: "Subscription",
    transaction_amount: 30.75,
    transaction_datetime: "2023-05-10 16:40:00",
  },
  // Add more transaction data if needed
];
*/
/* Retrieve the last 5 transactions for a user
function getLastFiveTransactions(userId) {
  return transactions
    .filter((transaction) => transaction.user_id === userId)
    .sort(
      (a, b) =>
        new Date(b.transaction_datetime) - new Date(a.transaction_datetime)
    )
    .slice(0, 5);
}
*/

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Replace with your DB username
  password: "yourpassword", // Replace with your DB password
  database: "menu_logger", // Replace with your DB name
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Retrieve the last 5 transactions for a user from the database
function getLastFiveTransactionsFromDB(userId) {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT transaction_type, transaction_amount, transaction_datetime 
        FROM transactions 
        WHERE user_id = ? 
        ORDER BY transaction_datetime DESC 
        LIMIT 5;
      `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Dialogflow webhook endpoint
app.post("/", async (req, res) => {
  try {
    // Access queryResult from the request
    const queryResult = req.body.queryResult;

    // Validate queryResult exists
    if (!queryResult) {
      throw new Error("Missing queryResult in the request body.");
    }

    // Extract intent name
    const intentName = queryResult.intent.displayName;
    console.log("Intent Name:", intentName);

    // Check for specific intent
    if (intentName === "track.application - context:ongoing-tracking") {
      const parameters = queryResult.parameters;
      const applicationId = parameters.applicationId;

      // Validate applicationId
      if (!applicationId) {
        throw new Error("Missing applicationId in parameters.");
      }

      console.log("Application ID******************:", applicationId);

      // Fetch application status
      //   const status = getApplicationStatus(applicationId);
      const status = await getApplicationStatus(applicationId);
      console.log("Application Status:", status);

      // Send response back to Dialogflow
      res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [`Your application status is: ${status}.`],
            },
          },
          {
            payload: {
              richContent: [
                [
                  {
                    type: "chips",
                    options: [
                      {
                        text: "Total transactions in last month",
                      },
                      {
                        text: "Check Premium card eligibility",
                      },
                      {
                        text: "Track other application",
                      },
                      {
                        text: "Thank you",
                      },
                    ],
                  },
                ],
              ],
            },
          },
        ],
      });
    } else if (intentName === "last.transactions") {
      const parameters = queryResult.parameters;
      const userId = parseInt(parameters.user_id); // Ensure user_id is an integer

      if (!userId) {
        throw new Error("Missing user_id in parameters.");
      }

      console.log("User ID:", userId);

      // Fetch the last 5 transactions
      //   const lastTransactions = getLastFiveTransactions(userId);
      const lastTransactions = await getLastFiveTransactionsFromDB(userId);

      if (lastTransactions.length === 0) {
        res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["No recent transactions found."],
              },
            },
            {
              payload: {
                richContent: [
                  [
                    {
                      type: "chips",
                      options: [
                        {
                          text: "Total transactions in last month",
                        },
                        {
                          text: "Check eligibility",
                        },
                        {
                          text: "Track other application",
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          ],
        });
        return;
      }

      // Format the response
      const transactionList = lastTransactions
        .map(
          (t) =>
            `${t.transaction_type} of $${t.transaction_amount} on ${t.transaction_datetime}`
        )
        .join("\n");

      res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [`Here are your last 5 transactions:\n${transactionList}`],
            },
          },
          {
            payload: {
              richContent: [
                [
                  {
                    type: "chips",
                    options: [
                      {
                        text: "Total transactions in last month",
                      },
                      {
                        text: "Check eligibility",
                      },
                      {
                        text: "Track other application",
                      },
                    ],
                  },
                ],
              ],
            },
          },
        ],
      });
    } else if (intentName === "learn.more") {
      res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [`Here are your options`],
            },
          },
          {
            payload: {
              richContent: [
                [
                  {
                    type: "chips",
                    options: [
                      {
                        text: "Total transactions in last month",
                      },
                      {
                        text: "Check Premium card eligibility",
                      },
                      {
                        text: "Track other application",
                      },
                      {
                        text: "Thank you",
                      },
                    ],
                  },
                ],
              ],
            },
          },
        ],
      });
    } else if (intentName === "Default Welcome Intent") {
      console.log(req.body.originalDetectIntentRequest);
      const payload =
        req.body.originalDetectIntentRequest?.payload?.userName || "there";

      console.log("Extracted userName:", payload);

      res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                `Hello ${payload}, I’m your Virtual Assistant. How can I help you today? You can ask me about credit cards, application process, eligibility, and more!`,
              ],
            },
          },
          {
            payload: {
              richContent: [
                [
                  {
                    type: "chips",
                    options: [
                      {
                        text: "Login",
                      },
                      {
                        text: "Sign Up",
                      },
                      {
                        text: "Learn More",
                      },
                    ],
                  },
                ],
              ],
            },
          },
        ],
      });
    } else if (intentName === "User Login Intent") {
      // Example: Extract user input (e.g., email and password)
      const parameters = req.body.queryResult.parameters;
      const email = parameters.email || "urwithdhanu@gmail.com";
      const password = parameters.password || "NoPasswordProvided";

      console.log("User Login Details:", { email, password });

      // Perform login logic here (e.g., validate against a database)
      const isAuthenticated = true;

      if (isAuthenticated) {
        res.json({
          fulfillmentMessages: [
            {
              text: {
                text: [
                  `Welcome back, ${email}! You're successfully logged in.`,
                ],
              },
            },
            {
              payload: {
                richContent: [
                  [
                    {
                      type: "chips",
                      options: [
                        {
                          text: "Last Transactions",
                        },
                        {
                          text: "Check eligibility",
                        },
                        {
                          text: "Track application",
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          ],
        });
      } else {
        res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["Invalid credentials. Please try again."],
              },
            },
          ],
        });
      }
    } else {
      console.log("Unknown intent:", intentName);
      res.status(400).send("Unhandled intent.");
    }
  } catch (error) {
    console.error("Error handling webhook:", error.message);
    res.status(500).send({
      fulfillmentMessages: [
        {
          text: {
            text: [`Error: ${error.message}`],
          },
        },
      ],
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
