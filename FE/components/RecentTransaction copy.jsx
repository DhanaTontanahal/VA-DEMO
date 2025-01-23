"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get the logged-in user from localStorage
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    if (authUser && authUser.email) {
      const email = authUser.email;

      // Fetch recent transactions from the backend
      axios
        .get(
          `http://localhost:3006/api/recent-transactions?email=urwithdhanu@gmail.com`
        )
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setError(
              error.response.data.error || "Error fetching transactions"
            );
          } else {
            setError("Failed to connect to the server.");
          }
        });
    } else {
      setError("User not logged in or email not found.");
    }
  }, []);

  return (
    <div style={{ padding: "5px" }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : transactions.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Type
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Amount
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {transaction.transaction_id}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {transaction.transaction_type}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  ${transaction.transaction_amount}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {new Date(transaction.transaction_datetime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recent transactions found.</p>
      )}
    </div>
  );
};

export default RecentTransactions;
