const express = require('express');
const port = 8080||8000;
const app = express();
const ejs = require('ejs');
const fetch = require("node-fetch")
bodyParser = require('body-parser')
var list;
var date;
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/search', (req, res) => {

    date = req.body.query;
    console.log("date searched = " + date);
    res.sendStatus(200,"SUCCESSFULL");
})
app.get('/', (req, res) => {
    var APOD;
    console.log("Starting the real appplication");
    var uri = "https://api.nasa.gov/planetary/apod?api_key=aCvWJ9iFukrGCr6bo9MjutRU4dW9laPQyhUbT5T4"
    var options = {
        method: 'GET',
    };
    fetch(uri, options)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            APOD = JSON.parse(result);
            if (date == null)
            {
                console.log("date is NULL\n\n")
                var uri = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-09-07&api_key=aCvWJ9iFukrGCr6bo9MjutRU4dW9laPQyhUbT5T4"    
            }
            else {
                console.log("date is "+date+"\n\n")
                var uri = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+date+"&api_key=aCvWJ9iFukrGCr6bo9MjutRU4dW9laPQyhUbT5T4"
            }
            
            fetch(uri, options)
                .then(response => response.text())
                .then(result => {
                    console.log("second api successfull_____________________"+result);
                    list = JSON.parse(result);
                    // res.render('index.ejs', {marsRover: list ,posterdata:APOD});
                     res.render('index.ejs', {posterdata: APOD,mars:list });
                })
                // .catch(error => console.log('error', error));


           
        })
        .catch(error => console.log('error', error));
   
    
})

app.listen(port, () =>{
    console.log("Listening at 8080");
})


// row = document.getElementById("mainRow")

// for (i = 0; i < 3; i++)
// {
//     card = document.createElement('div')
//     card.className="col-md-auto"
//     p = document.createElement('p')
//     p.innerHTML = "Hi I am auot"
//     card.appendChild(p)
//     row.appendChild(card)
    
//     }
