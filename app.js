// Imports
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./public/images'));

// Set views
app.set('vews', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("main", { text: 'This is EJS' });
});

app.get('/about', (req, res) => {
    res.render("about", { text: 'This is EJS' });
})

app.get('/menu', (req, res) => {
    res.render("menu", { text: 'This is EJS' });
})

app.get('/contact', (req, res) => {
    res.render("contact", { text: 'This is EJS' });
})

app.listen(port, () => {
    console.log('Server/App is running at', port);
});








/*
app.get('*', (req, res) => {
    res.send(`<h1>About Us</h1> <br>
    <h2>Hello World </h2>`);
    res.status(404).send('Not Found');
});


app.listen(port);
*/