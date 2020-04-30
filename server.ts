import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import rateLimit from "express-rate-limit";
import sqlite from "better-sqlite3";
import "./utils";
import { shortenURL, isShortenedUrlValid } from "./utils";

const app = express();

const db = sqlite(String(process.env.DB));

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
})

app.set("view engine", "ejs");
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.render("index");
})

app.get("/:url", async (req, res) => {
    try {
        if(isShortenedUrlValid(req.params.url)) {
            res.redirect("test");
        } else {
            res.send("Invalid url");
        }
    } catch(e) {
        console.log(e);
        res.send("Invalid url");
    }
})

app.post("/api/shortenURL", async (req,res) => {


        // add shortenedURL
        //await shortenURL(req.url);

        res.redirect("/");
})

app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));
