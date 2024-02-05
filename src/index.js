const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connection.js")

const app = express();
const PORT = 8000;

/**
 * It onfigures the use of body-parser middleware to parse JSON-formatted data in incoming requests.
 * "limit": 30mb This option specifies the maximum size of the JSON payload that can be parsed.
 * Requests larger than this limit will result in a 413 (Payload Too Large) error.
 * extended: true: This option allows parsing of nested JSON objects and arrays. When set to true, it enables parsing of complex JSON structures.
 */

app.use(bodyParser.json({ limit: "30mb", extended: true }));

/**
 * URL-encoded data is typically sent from HTML forms submitted by users.
 * When a form is submitted with the application/x-www-form-urlencoded content type,
 * the data is sent as key-value pairs in the body of the HTTP request, with keys and values being encoded in a specific format.
 */

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// const CONNECTION_URL = "mongodb://localhost:27017/social-media";


connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));


