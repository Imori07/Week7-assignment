import express from "express";
import cors from "cors";

import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running is PORT ${PORT}`);
});

app.get("/", function (_, res) {
  res.json({ message: "This is the root route. How roude!" });
});

//I want a route to READ all the biscuits data from my table
app.get("/biscuits", async (req, res) => {
  const result = await db.query(`SELECT * FROM biscuits`);
  res.json(result.rows);
});

//I want to CREATE a new entry in the biscuits table
app.post("/add-biscuit", (req, res) => {
  const newData = req.body;
  const query = db.query(
    `INSERT INTO biscuits (biscuit_name, src, description, crunchiness) VALUES($1, $2, $3, $4);`,
    [
      newData.biscuit_name,
      newData.src,
      newData.description,
      newData.crunchiness,
    ]
  );
  res.json({ message: "Data sent to the database!" });
});

//I want to UPDATE an existing biscuit entry in the biscuits table
//We want the params in this url to be dynamic to represent any id value of the entry that we want to update
app.put("/update-biscuit/:id", (req, res) => {
  const updateData = req.body;
  const paramsToUpdateBiscuit = req.params;
  const query = db.query(
    `UPDATE biscuits SET biscuit_name= $1, src= $2, description= $3, crunchiness= $4 WHERE id= $5`,
    [
      updateData.biscuit_name,
      updateData.src,
      updateData.description,
      updateData.crunchiness,
      paramsToUpdateBiscuit.id,
    ]
  );
  res.json({ message: "Data updated! Go have a look in your table" });
});

//I want to DELETE one biscuit entry from the biscuits table
//We need dynamic params so we can specify which entry we want to delete
app.delete("/delete-biscuit/:id", (req, res) => {
  const paramsToDeleteBiscuit = req.params;
  const query = db.query(`DELETE FROM biscuits WHERE id= $1`, [
    paramsToDeleteBiscuit.id,
  ]);
  res.json({
    message: "You have performed a destructive operation. How dare you?!",
  });
});

//==============================================================
//What tasks can we perform with our server?

//Tasks --> CRUD
//create
//read
//update
//delete

//Each task has an HTTP method assigned to it
//post
//get
//put
//delete
//==============================================================
//This is an example of what the body object will look like
// body = {
//   biscuit_name: "Jaffa Cake",
//   src: "#",
//   description: "Is it a biscuit?",
//   crunchiness: 0,
// };
//==============================================================
//Params vs parameters
//Parameters --> placeholders in a function that we will replace with an argument later on
//Params --> a part of the url after the domain name
//==============================================================
