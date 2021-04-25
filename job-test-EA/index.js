const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 5001;

const main = () => {
  app.use(bodyParser.json());

  //POST endpoint for handling CL node calls
  app.post("/", async (req, res) => {
    console.log("Time: ", new Date());
    console.log("POST Data: ", req.body);
    const output = { id: req.body.id };

    // console.log(req.body);
    console.log('output', output);
    res.status(200).send(output);
  });

  app.listen(port, () => console.log(`${port} is active`));

  process.on("SIGINT", () => {
    process.exit();
  });
};

main();
