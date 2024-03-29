const cookieParser = require("cookie-parser");
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const { discord } = require('./passports/index.js');
const { auth, posts } = require('./routes/index.js');
const { port, mongodb } = require("./config.js");


const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE","PATCH"],
        credentials: true,
    }
});

require('./soket/friend')(io);
require('./soket/groups')(io);

app.use(session({
    name: "web",
    secret: "<some_secret>",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
}));

app.use(express.json());

app.use('/auth', auth);
app.use('/api', posts);

mongoose.set('strictQuery', false).connect(mongodb, { useNewUrlParser: true }, async (err, database) => {
    
    if(err) return console.error(err);

    const db_name = database.connections.map(db => db.name);
    console.log(`Сервер подключен к базе: ${db_name}`);

    server.listen(port, () => {
        console.log(`Сервер стартанул на порту ${port}`);
    });
});