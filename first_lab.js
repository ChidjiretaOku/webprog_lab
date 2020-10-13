//import * as fs from "fs";

const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000


let ex9 = require("./functions_1/9.js");
let ex12 = require("./functions_1/12.js");
let ex22 = require("./functions_1/22.js");

app.set("view engine", "pug")

app.use('/', logConsole)


app.use('/Main', function (req, res) {
    res.render('layout', {
        title: 'Main page'
    });
})

app.use('/api/MagoyanTigran/lab1/ex9/input', function (req, res) {
    res.render('input_9')
})
app.use('/api/MagoyanTigran/lab1/ex12/input', authMiddle, function (req, res) {
    res.render('input_12')
})
app.use('/api/MagoyanTigran/lab1/ex22/input', authMiddle, function (req, res) {
    res.render('input_22')
})
app.use('/api/MagoyanTigran/lab1/ex9/exec', middle9, function (req, res) {
    res.render('output_9', {
        amount: ex9.monthsBetween(req.query.d1, req.query.m1, req.query.y1, req.query.d2, req.query.m2, req.query.y2),
        first: ex9.date1,
        second: ex9.date2,
    })
})
app.use('/api/MagoyanTigran/lab1/ex12/exec', authMiddle, middle12, function (req, res) {
    res.render('output_12', {
        str: req.query.str,
        char: req.query.char,
        substr: ex12.sliceFrom(req.query.str, req.query.char),
    })
})
app.use('/api/MagoyanTigran/lab1/ex22/exec', authMiddle, middle22, function (req, res) {
    res.render('output_22', {
        array: (req.query.arr).split(","),
        n: req.query.n,
        result: ex22.shiftNum((req.query.arr).split(","), req.query.n),
    })
})


function logConsole(req, res, next) {
    let date = new Date()
    console.log(date + ' ' + req.method + ' ' + req.url)
    next()
}

function logFile(err, req, res, next) {
    let date = new Date()
    if (err.message === 'Bad request') {
        res.statusCode = 400
    } else if (err.message === 'Unauthorized') {
        res.statusCode = 401
    }
    fs.appendFileSync('errorLog.txt', date + ' ' + res.statusCode + ' ' + req.url + '\n')
    next(err)
}

function middle9(req, res, next) {
    if (req.query.d1 >= 1 && req.query.d1 <= 31 && req.query.d2 >= 1 && req.query.d2 <= 31 && req.query.m1 >= 1 && req.query.m1 <= 12 && req.query.m2 >= 1 && req.query.m2 <= 12 && req.query.y1 >= 1900 && req.query.y2 >= 1900) {
        next()
    } else {
        next(new Error('Bad request'))
    }
}

function middle12(req, res, next) {
    let char = (req.query.char)
    let string = (req.query.str)
    if (string.search(char) === -1) {
        next(new Error('Bad request'))
    } else {
        if (string.length === 0 || char.length > 1 || char.length === 0) {
            next(new Error('Bad request'))
        } else {
            next()
        }
    }
}

function middle22(req, res, next) {
    if (req.query.n < 0 || req.query.n > req.query.arr.length || req.query.arr.length <= 0) {
        next(new Error('Bad request'))
    } else {
        next()
    }
}

function authMiddle(req, res, next) {
    if (req.query.auth) next()
    else {
        next(new Error('Unauthorized'))
    }
}

app.use('/', logFile)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/main`)
})