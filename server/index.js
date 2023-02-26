const client = require("./connection.js");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(3300, () => {
  console.log("server is listening");
});

client.connect();

app.get("/klinikat", (req, res) => {
  client.query(`SELECT * FROM klinikat`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/adm1", (req, res) => {
  client.query(
    `SELECT name_1, ST_AsGeoJSON(geom) AS geometry FROM ko__adm1`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

// save newly created clinic point(geom) and name
app.post("/clinics", (req, res) => {
  const name = req.body.name;
  const geom = req.body.geom;

  // Convert the GeoJSON Point to a PostgreSQL geometry type
  const point = {
    type: "Point",
    coordinates: geom.coordinates,
  };
  const pointGeoJSON = JSON.stringify(point);
  const pointGeom = `ST_SetSRID(ST_GeomFromGeoJSON('${pointGeoJSON}'), 4326)`;

  // Insert a new row into the "clinics" table
  client.query(
    `INSERT INTO clinics (name, geom) VALUES ($1, ${pointGeom})`,
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting new clinic");
        return;
      }

      res.status(201).send("New clinic created successfully");
    }
  );
});

// Get all clinic names
app.get("/clinics", (req, res) => {
  client.query("SELECT name, image_url FROM clinics", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving clinics");
      return;
    }

    res.send(result.rows);
  });
});
// Get specific clinic based on it's name
app.get("/clinics/:name", (req, res) => {
  const name = req.params.name;

  // Query the "clinics" table for the clinic with the given name
  client.query(
    "SELECT name, image_url, ST_AsGeoJSON(geom) as geom FROM clinics WHERE name = $1",
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving clinic");
        return;
      }

      if (result.rows.length === 0) {
        res.status(404).send("Clinic not found");
        return;
      }

      // Convert the PostgreSQL geometry type to a GeoJSON Point
      const point = JSON.parse(result.rows[0].geom);
      const clinic = {
        name: result.rows[0].name,
        image_url: result.rows[0].image_url,
        geom: point,
      };

      res.status(200).json(clinic);
    }
  );
});
