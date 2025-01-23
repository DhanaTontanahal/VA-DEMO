"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./TransactionsTable"; // Adjust the path as necessary

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
    <div style={{ padding: "20px" }}>
      <h2>Recent Transactions</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : transactions.length > 0 ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <p>No recent transactions found.</p>
      )}
    </div>
  );
};

export default RecentTransactions;
