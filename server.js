// External libraries
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var currTime = new Date().toString();
    var log = `${currTime}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n' , (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// Used to stop the website continue on
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Hello, the website is updating... to bad :('
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// Get - default
app.get('/', (req, res) => {
    res.render('home.hbs', {
        messageTitle: 'Welcome to my awesome site =]',
        pageTitle: 'There are a lot of fun things over here'
    });

});


// Get - about
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

// Get - Projects
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'My projects',
        someText: 'This is to show all my project which I have some far'
    })

})


// Get - bad
app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Oh crap, something bad happen O_0'
    });
})

// By port
app.listen(port);