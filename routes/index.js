var login = require('../models/login');
var user = require('../models/user');
var chat = require('../models/chat');

module.exports = function (app, socket) {

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/client/www/index.html');
    });

    app.post('/start-chat', function (req, res) {
        var nickname = req.body.nickname;

        var collection = new user.user({
            nickname: nickname,
            online: 'Y',
            socket_id: process.env.userid
        });

        collection.save(function (err, savedUser) {
            if (err) {
                res.status(500).send('Error');
            } else {
                socket.emit('new entry');
                res.send({ message: 'User added to chat!', user: savedUser });
            }
        });
    });

    app.get('/get-online-users', function (req, res) {
        user.user.find({
            online: 'Y'
        }, function (err, users) {
            if (users) {
                res.send({ 'users': users });
            } else {
                res.status(500).send({ 'error': err });
            }
        });
    });

    app.get('/remove-user', function (req, res) {
        console.log('socket id is:: ' + req.param('socketid'));
        user.user.findOne({
            socket_id: req.param('socketid')
        }, function (err, user) {
            if (user) {
                user.online = 'N';
                user.save(function (err) {
                    if (!err)
                        res.send('user is offline now');
                    else
                        res.status(500).send({ 'error': err });
                });

            } else {
                res.status(500).send({ 'error': err });
            }
        });
    });

    app.post('/save-sent-message', function (req, res) {
        var fromid = req.body.fromid;
        var toid = req.body.toid;
        var msg = req.body.msg;

        var col = new chat.msg({
            from_id: fromid,
            to_id: toid,
            msg: msg
        });

        col.save(function (err, msg) {
            if (err) {
                console.log('Not saved due to error');
                res.status(500).send({ error: err });
            } else {
                user.user.findOne({
                    _id: toid
                }, function (err, user) {
                    if (user) {
                        socket.emit('msg', { fromid: fromid, toid: toid, msg: msg, tonickname: user.nickname });

                        console.log('Saved in db');
                        res.send('Saved');
                    }
                });


            }
        });
    });

    app.post('/login', function (req, res) {
        var socketid = process.env.socketid;
        var username = req.body.username;
        var password = req.body.password;

        var collection = new login.login({
            username: username,
            password: password
        });

        collection.save(function (err) {
            if (err) {
                res.status(500).send('Error');
            } else {
                res.send('Added');
            }
        });
    });

    app.get('/all-users', function (req, res) {
        res.send('');
    });

}