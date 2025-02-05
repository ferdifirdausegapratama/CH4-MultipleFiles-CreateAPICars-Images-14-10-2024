const morgan = require("morgan");
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoute = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Middleware : Reading json from body (client)
app.use(express.json());

//app.use(express.urle)

// middleware : LOGGING !! thurdparty package
app.use(morgan());

// contoh middleware yang dibuat sendiri
app.use((req, res, next) => {
  console.log("incoming request ...");
  // better logging dibawahnya
  next();
});

// logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // better logging dibawahnya
  next();
});

// logging basic
app.use((req, res, next) => {
  req.username = "FSW2";
  // better logging dibawahnya
  next();
});

// middleware : yang bisa membuat express application kita bisa membaca static file
app.use(express.static(`${__dirname}/public`));

// memanggil view engine
app.set("view engine", "ejs");

app.get("/dashboard/admin/", async (req, res) => {
  try {
    res.render("index", {
      greeting: "Hello FSW 2 Dengan Data Dinamis, Kalian Luar Biasa",
    });
  } catch (error) {
    console.log(error);
  }
});

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Dashboard Route
app.use("/dashboard/admin", dashboardRoute);
// API Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// midlleware to handle page not found
app.use((req, res, next) => {
  /*console.log("proses saat ada yang request");
  console.log(req.requestTime);
  console.log("proses siapa yang request");
  console.log(req.username);
  console.log("proses yang apa diminta");
  console.log(req.originalURL); */

  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
