const express = require('express');
const app = express();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./middleware/errorHandler');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

//use for passport session management
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE']}));
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
    // In a real application, you would save the user to the database here
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



app.get('/', (req, res) => 
        // #swagger.ignore = true
    {res.send(req.session.user !== undefined ? 
        `Logged in as, ${req.session.user.displayName}!` : 
        'Logged Out');});

app.get('/github/callback', passport.authenticate('github', 
    // #swagger.ignore = true
    { failureRedirect: '/api-docs', session: false }), 
(req, res) => {
    // #swagger.ignore = true
req.session.user = req.user;
res.redirect('/');
});

app.use('/', require('./routes'));
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongodb.initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database.');
        console.error(err);
    } else {
        console.log('Database initialized');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});