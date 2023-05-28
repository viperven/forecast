const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const city = req.body.cityname;
    const unit = req.body.unit;
    const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=59a28423f7db9bf7f3a9acbcf59b86bb&units=" + unit;
    https.get(apiLink, function (response) {

        response.on("data", function (data) {
            const Weatherdata = JSON.parse(data);
            const temp = Weatherdata.main.temp;
            const mood = Weatherdata.weather[0].description;
            const icon = Weatherdata.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature in  " + city + " is " + temp + "</h1>");
            res.write("The Weather Mood is : " + mood);
            res.write("<img src =" + imgURL + ">");
            res.send();
        });


    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server running at 3000");
});

