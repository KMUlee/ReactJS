const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database
});

connection.connect();

const sessionStore = new MySQLStore({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
    port: 3306
})

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

app.get('/api/users', (req, res) => {
    connection.query(`select * from userdata where email = ? and isDeleted = 0` ,[req.session.email], (err, rows) => {
        res.send(rows)
    })
})

app.post('/api/users', ((req, res) => {
    let sql = 'insert into users values(null, ?, ?, ?)';
    let email = req.body.email;
    let nickname = req.body.nickname;
    let pwd = req.body.pwd;

    connection.query('select * from users', (err, rows) => {
        if(err){ throw err; }
        for (var i = 0; i < rows.length; i++){
            if(rows[i].email === email){
                res.send({state: false});
                return;
            }
        }
        connection.query(sql, [nickname, email, pwd], (err, rows) => {
            if(err){ throw err; }
            req.session.is_logined = true;
            req.session.userName = nickname;
            req.session.email = email;
            req.session.save(() => {
                res.send({state: true});
            })
        })
    })
}))

app.delete('/api/users/:id', (req, res) => {
    console.log('delete')
    let sql = 'update userdata set isDeleted = 1 where userdata.index = ?';
    let params = [parseInt(req.params.id)];
    connection.query(sql, params, (err, rows) => {
        if(err) {throw err;}
        res.send(rows)
    })
})

app.post('/api/login', (req, res) => {
    connection.query('select * from users', (err, userData) => {
        if(err) { throw err; }
        for(var i = 0; i < userData.length; i++) {
            if(userData[i].email === req.body.email && userData[i].pwd === req.body.pwd) {
               req.session.is_logined = true;
               req.session.userName = userData[i].nickname;
               req.session.email = userData[i].email;
               req.session.save(() => {
                   res.send({
                       is_logined: true,
                       userName: req.session.userName
                   })
               })
            }
        }
    })
})

app.get('/api/login', (req, res) => {
    res.send({
        is_logined: req.session.is_logined === undefined ? false : req.session.is_logined,
        userName: req.session.userName === undefined ? "" : req.session.userName,
    })
})

app.post('/api/logout', (req, res) => {
    if (req.body.logout === true) {
        req.session.destroy();
        res.send();
    }
})

app.post('/api/userdata', (req, res) => {
    let sql = 'insert into react.userdata values(null, ?, ?, ?, ?, now(), 0)';
    let params = [req.session.email, req.body.id, req.body.pwd, req.body.site];
    connection.query(sql, params, (err, rows) => {
        if(err) {throw err;}
        res.send("success")
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));