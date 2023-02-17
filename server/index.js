const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect = require("./Config/db");
const authRoutes = require("./Routes/auth.routes");
const usersRoutes = require("./Routes/user.route");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => [res.send("Home Page")]);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.listen(8080, () => {
  try {
    connect.then((res) => {
      console.log("db is connected");
    });
    console.log(`Server is running at port 8080`);
  } catch (error) {
    console.log("error:", error);
  }
});
