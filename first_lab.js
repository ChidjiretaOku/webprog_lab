const express = require('express')
const app = express()
const port = 3000


var ex9 = require("./functions_1/9.js");
var ex12 = require("./functions_1/12.js");
var ex22 = require("./functions_1/22.js");

app.get('/', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>First</title>
            </head>
            <body>
                <div>Hey there!</div>
                <div>To check ex9 click <a href="http://localhost:3000/api/MagoyanTigran/lab1/ex9?d1=1&d2=1&m1=1&m2=1&y1=1970&y2=2000">here</a></div>
                <div>To check ex12 click <a href="http://localhost:3000/api/MagoyanTigran/lab1/ex12?char=g&str=asdfghj">here</a></div>
                <div>To check ex22 click <a href="http://localhost:3000/api/MagoyanTigran/lab1/ex22?arr[]=1&arr[]=2&arr[]=3&arr[]=4&arr[]=5&n=3">here</a></div>
            </body>
            </html>
    `)
    }
)
app.get('/api/MagoyanTigran/lab1/ex9', middle9, (req, res) => {
    res.send("There were " + ex9.monthsBetween(req.query.d1, req.query.m1, req.query.y1, req.query.d2, req.query.m2, req.query.y2) + " months between<br />" + ex9.date1 + "<br />and<br />" + ex9.date2)
})
app.get('/api/MagoyanTigran/lab1/ex12', middle12, (req, res) => {
    res.send("Cut '" + req.query.str + "' from " + req.query.char + " and got<br />Result - '" + ex12.sliceFrom(req.query.str, req.query.char) + "'")
})
app.get('/api/MagoyanTigran/lab1/ex22', middle22, (req, res) => {
    res.send(req.query.arr + " | " + req.query.n + "<br />" + ex22.shiftNum(req.query.arr, req.query.n))
})

function middle9(req, res, next) {
    if (req.query.d1 >= 1 && req.query.d1 <= 31 && req.query.d2 >= 1 && req.query.d2 <= 31 && req.query.m1 >= 1 && req.query.m1 <= 12 && req.query.m2 >= 1 && req.query.m2 <= 12 && req.query.y1 >= 1900 && req.query.y2 >= 1900) {
        next()
    } else {
        res.status(228).send("Invalid input")
    }
}

function middle12(req, res, next) {
    let char = (req.query.char)
    let string = (req.query.str)
    if (string.search(char) === -1) {
        res.status(404).send("Char not found")
    } else {
        if (string.length === 0 || char.length > 1 || char.length === 0) {
            res.status(228).send("Invalid input")
        } else {
            next()
        }
    }
}

function middle22(req, res, next) {
    if (req.query.n < 0 || req.query.n > req.query.arr.length || req.query.arr.length <=0) {
        res.status(228).send("Invalid input")
    } else {
        next()
    }
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})