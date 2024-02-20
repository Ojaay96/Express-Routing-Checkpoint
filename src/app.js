import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to verify time of request
const timeMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res
      .status(403)
      .send(
        "Sorry, the website is only available during working hours (Monday to Friday, from 9 to 17)."
      );
  }
};

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.static("stylesheets"));

// Set view engine to EJS
app.set("view engine", "ejs");

// Routes
app.get("/", timeMiddleware, (req, res) => {
  res.render("home");
});

app.get("/services", timeMiddleware, (req, res) => {
  res.render("services");
});

app.get("/contact", timeMiddleware, (req, res) => {
  res.render("contact");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
