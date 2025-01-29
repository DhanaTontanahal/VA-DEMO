const transactionService = require("../services/transactionService");
const dbService = require("../services/dbService");
const menuUtils = require("../utils/menuUtils");

const getAccountBalance = async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const accountDetails = await dbService.getAccountBalanceByEmail(email);
    if (!accountDetails) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(accountDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch account balance" });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const { intent } = req.body.queryResult;
    const intentName = intent.displayName;

    if (intentName === "last.transactions") {
      const userId = req.body.queryResult.parameters.user_id;
      const transactions = await transactionService.getLastFiveTransactions(
        userId
      );
      const responseText = transactions
        .map(
          (t) =>
            `${t.transaction_type} of $${t.transaction_amount} on ${t.transaction_datetime}`
        )
        .join("\n");
      res.json({
        fulfillmentMessages: [
          { text: { text: [responseText] } },
          {
            payload: {
              richContent: [
                [{ type: "chips", options: menuUtils.getMainMenuOptions() }],
              ],
            },
          },
        ],
      });
    }
    // Add other intents...
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        fulfillmentMessages: [{ text: { text: [`Error: ${error.message}`] } }],
      });
  }
};

module.exports = {
  getAccountBalance,
  handleWebhook,
};
