const express = require("express");
const port = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", (req, res) => {
  res.send(
    `Hello World \n my name is ${req.query.name} and my age is ${req.query.age}`
  );
});
app.listen(port, () => console.log(`server is running on port ${port}`));
