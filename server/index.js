const client = require('./connection.js')
const express = require('express')
const app = express()

app.listen(3300, () =>{
  console.log("server is listening")
})

client.connect()


app.get('/klinikat', (req, res) =>{
  client.query(`SELECT * FROM klinikat`, (err, result)=>{
    if (!err){
      res.send(result.rows);
    }
  })
  client.end
})

app.get('/adm1', (req, res) => {
  client.query(`SELECT name_1, ST_AsGeoJSON(geom) AS geometry FROM ko__adm1`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end
});

app.post('/clinics', (req, res) => {
  const name = req.body.name;
  const geom = req.body.geom;

  // Insert a new row into the "clinics" table
  client.query(`INSERT INTO clinics (name, geom) VALUES ($1, ST_GeomFromText($2, 4326))`, [name, geom], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting new clinic');
      return;
    }

    res.status(201).send('New clinic created successfully');
  });
});