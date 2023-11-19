const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

/* ENDPOINTS */
// Login
app.post("/login", (req, res) => {
  res.status(200).json({ message: "Successful" });
});

// Registration
app.post("/registration", (req, res) => {
  res.status(201).json({ message: "Successful" });
});

// Account
app.put("/update", (req, res) => {
  res.status(200).json({ message: "Successful" });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
