"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountBalance = () => {
  const [accountBalance, setAccountBalance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get the logged-in user from localStorage
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUser);
    if (authUser && authUser.email) {
      const email = authUser.email;

      console.log(email);
      // Fetch account balance from the backend
      axios
        .get(
          `https://localhost:3006/api/account-balance?email=urwithdhanu@gmail.com`
        )
        .then((response) => {
          console.log(response.data);
          setAccountBalance(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setError(
              error.response.data.error || "Error fetching account balance"
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
    <div style={{ padding: "2px" }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : accountBalance ? (
        <div>
          <p>
            <strong>Account Number:</strong> {accountBalance.accountNumber}
          </p>
          <p>
            <strong>Balance:</strong> ${accountBalance.balance}
          </p>
        </div>
      ) : (
        <p>Loading account balance...</p>
      )}
    </div>
  );
};

export default AccountBalance;
