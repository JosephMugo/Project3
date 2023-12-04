const express = require("express");
const cors = require("cors");
const registerLoginCredentials = require("./services/registerService");
const validateLoginCredentials = require("./services/loginService");
const {
  insertAccountDetails,
  retrieveAccountDetails,
  updateAccountDetails,
} = require("./services/accountService");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

/* ENDPOINTS */
// Login
app.post("/login", (req, res) => {
  validateLoginCredentials(req, res);
});

// Registration
/*
  Registration Endpoint will accept data from React app, insert new record into the user_accounts table 
  -> Return 201 and return the primary key of the newly created user account.
  -> Return 409 if that username already has a user account.
*/
app.post("/registration", (req, res) => {
  registerLoginCredentials(req, res);
});

// Account
app.post("/account", (req, res) => {
  insertAccountDetails(req, res);
});

app.get("/account", (req, res) => {
  retrieveAccountDetails(req, res);
});

app.put("/account", (req, res) => {
  updateAccountDetails(req, res);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
