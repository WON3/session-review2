require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    sessions = require('express-session'),
    app = express(),
    { SERVER_PORT, SECRET } = process.env;

app.use(bodyParser.json());

app.use(sessions({
    secret: SECRET,
    saveUninitialized: false,
    resave: false
}))

const session = {
    color: 'red'
}

app.use((req, res, next) => {
    if (!req.session.color) {
        const colors = ['Green', 'red', 'TOMATO', 'violet', 'mustard', 'Goldenrod'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        req.session.color = colors[randomIndex];
    }
    next();
});

app.get('/api/color', (req, res) => {

    res.send(req.session.color)

})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})
