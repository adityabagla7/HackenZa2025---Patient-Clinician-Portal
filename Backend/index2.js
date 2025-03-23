require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const db = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect(err => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    } else {
        console.log("Connected to the database");
    }
});

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    "google-patient",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/patient/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("Patient Profile:", JSON.stringify(profile, null, 2));
            const user = { profile, role: "patient" };
            return done(null, user);
        }
    )
);

passport.use(
    "google-clinician",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/clinician/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            const user = { profile, role: "clinician" };
            console.log(profile);
            const em = profile.emails[0].value;
            if (em.includes("@goa.bits-pilani.ac.in")) {
                return done(null, user);
            } else {
                console.log("Unauthorized access attempt by:", em);
                return done(null, false, { message: "You are not an authorized member of this clinic" });
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/", (req, res) => {
    res.send(`
        <a href='/auth/google/patient'>Login as Patient</a><br>
        <a href='/auth/google/clinician'>Login as Clinician</a>
    `);
});

app.get("/auth/google/patient", passport.authenticate("google-patient", { scope: ["profile", "email"] }));
app.get("/auth/google/patient/callback", passport.authenticate("google-patient", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/patient-dashboard");
});

app.get("/auth/google/clinician", passport.authenticate("google-clinician", { scope: ["profile", "email"] }));
app.get("/auth/google/clinician/callback", passport.authenticate("google-clinician", { failureRedirect: "/unauthorised" }), (req, res) => {
    res.redirect("/clinician-dashboard");
});

app.get("/unauthorised", (req, res) => {
    res.send("You are not an authorized member of this clinic");
});

app.get("/patient-dashboard", (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "patient") {
        return res.redirect("/");
    }
    res.send(`Welcome Patient, ${req.user.profile.displayName}`);
});

app.get("/clinician-dashboard", (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "clinician") {
        return res.redirect("/");
    }
    res.send(`Welcome Clinician, ${req.user.profile.displayName} hoping you are having a nice day.`);
});

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});



app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
