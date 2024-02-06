const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connection.js");

/**
 * Load all the envirnoment variables on the initial load of first entry point
*/
dotenv.config();

const app = express();

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

//routes

const postRoute = require("./routers/post.route.js");

app.use("/api/v1", postRoute);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection FAILED !!!", err);
  });
