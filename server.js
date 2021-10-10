require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./app/models/register')
const flash = require('express-flash')
const session = require('express-session')
const MongoDbStore = require('connect-mongo') 

// connect DB
const db_url = process.env.DB_URL
const connection = mongoose.connection
mongoose.connect(db_url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected');
}).catch((error) => {
    console.log(error);
})

// Session store creates a collection in the DB
let mongoStore = MongoDbStore.create({
    mongoUrl: db_url
    //mongooseConnection: connection, //name of the Db where we will store session
    //collection: 'sessions',  //name of the collection where we will store session
})

//middlewares
// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
  }))
  
app.use(flash())

//middlewares
app.use(express.json()) //receiving json data
app.use(express.urlencoded({extended: false})) //receiving json data
app.use(express.static('public'));


//global middleware so that session and user can be used anywhere
app.use((req,res,next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/public/views'))
app.set('view engine','ejs')


require('./routes/web')(app)

app.listen(PORT,() => {
    console.log(`Listening to port ${PORT}`)
})