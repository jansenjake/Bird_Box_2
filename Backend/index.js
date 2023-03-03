//  INITIALIZE EXPRESS //
const express = require('express');
// ROUTES //
const route = require('./routes/routes.js')
//  CORS //
const cors = require('cors');
//  PORT //
const port = parseInt(process.env.PORT) || 8080;
//  EXPRESS APP //
const app = express();
//  MIDDLEWARE //
const{errorHandling} = require('./middleware/ErrorHandling');
// FOR SECURITY
const cookieParser = require('cookie-parser');

// 
app.use((req, res, next)=> {
    res.header('Acess-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next();
});
// FOR CORS, ROUTER //
app.use(route);
app.use(
    cors(),
    cookieParser(),
    express.json,
    express.urlencoded({extended: false})
)

//  SERVER IS RUNNING //
app.listen(port, ()=> {
    console.log(`Server is running`)
});

//  HANDLING ALL ERRORS //
app.use(errorHandling);