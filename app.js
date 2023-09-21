// Import the modules
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

// Set up server details
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nhadde:WUlBWxGTUJGqTgDC@cluster0.tckbzcq.mongodb.net/RegistrationForm')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })

// Set ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./public/css'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
})

app.get('/addUser', async (req, res) => {
    res.render('add');
})

app.post('/addUser', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });

    await user.save();
    res.redirect('/');
})

app.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
})

app.post('/edit/:id', async (req, res) => {
    await User.findByIdAndUpdate({_id: req.params.id}, req.body);
    res.redirect('/');
})

app.post('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})