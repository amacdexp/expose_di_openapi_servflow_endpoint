// Import dependencie
import  express from "express";

// Setup the express server
const app = express();

//Define basic check path
app.get("/", function (req, res) {
  res.send("Working");
});


// Import routes
import authRouter     from "./routes/auth.js";
import diRouter       from "./routes/diProxy.js";

// Setup all the routes
app.use("/api/getToken", authRouter);   //generates a JWT Token for a validated user
app.use("/api/diProxy", diRouter);      //Provides a proxy URL to a DI Enpoint, must have valid JWT Token to access.


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("myapp listening on port " + port);
}); 