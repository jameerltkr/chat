var user = require('../models/user');

var self = {
    queryRunner: function (data, callback) {
        /*
        Function required to run all the queries.
        */
        var db_conncetion = data.connection;
        var query = data.query;
        var insert_data = data.insert_data;
        db_conncetion.getConnection(function (err, con) {
            if (err) {
                con.release();
            } else {
                db_conncetion.query(String(query), insert_data, function (err, rows) {
                    con.release();
                    if (!err) {
                        callback(rows);
                    } else {
                        console.log(err);
                        console.log("Query failed");
                    }
                });
            }
        });
    },
    getLastConversationId: function ( callback) {
        /*
        Function to get last conversation ID.
        */

        user.conversation.findOne({}.sort(con_id, 1).run(function (err, data) {
            if (data) {
                var conversationid = parseInt(data.con_id);
                conversationid++;
                callback({
                    ID: conversationid
                });
            } else {
                callback({
                    ID: 0
                });
            }
        }));

    },
    isConversationPresent: function (data,  callback) {
        /*
        Function to check conversation is present in DB conversations table.
        */
        var is_present = false;
        var con_id = "";

        user.conversation.find({ $or: [{ to_id: data.to_id, from_id: data.from_id },
                                   { to_id: data.from_id, from_id: data.to_id}]
        },
                         {},
                         { limit: 1 },
                         function (err, messages) {
                             //pushSvdMsgs(messages); 
                             if (messages) {
                                 is_present = true;
                                 con_id = messages.con_id;
                             } else {
                                 is_present = false;
                                 con_id = 0
                             }

                             callback({
                                 is_present: is_present,
                                 con_id: con_id
                             });
                         });

    },
    insertConversation: function (data,  callback) {
        /*
        Function to insert consersation.
        */
        var insert_conversation = new user.conversation({
            from_id: data.from_id,
            to_id: data.to_id,
            timestamp: Math.floor(new Date() / 1000),
            con_id: data.con_id
        });
        insert_conversation.save(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result._id);
            }
        });
    },
    insertMsg: function (data,  callback) {
        /*
        Function to insert messages.
        */
        var data_insert = new user.conversation_reply({
            id: '',
            reply: data.msg,
            from_id: data.from_id,
            to_id: data.to_id,
            timestamp: Math.floor(new Date() / 1000),
            con_id: data.con_id
        });

        data_insert.save(function (err, result) {
            if (result) {
                callback(result)
            } else {
                callback(err)
            }
        })

    },
    callMsgAfterConversation: function (data,  callback) {
        /*
        Separate Function to insert message and conversation in DB ( Just to make our code short ).
        */
        var conversation_data = new user.conversation({
            to_id: data.to_id,
            from_id: data.from_id,
            con_id: data.conversation_id
        });
        conversation_data.save(function (err, result) {
            if (result) {
                var insert_msg = new user.msg({
                    id: '',
                    msg: data.msg,
                    from_id: data.from_id,
                    to_id: data.to_id,
                    timestamp: Math.floor(new Date() / 1000),
                    con_id: data.conversation_id
                });

                insert_msg.save(function (err, data) {
                    if (data) {
                        callback({
                            msg: data.msg,
                            from_id: data.from_id,
                            to_id: data.to_id,
                            timestamp: Math.floor(new Date() / 1000)
                        });
                    } else {

                    }
                })
            }
        });

    },
    saveMsgs: function (data,  callback) {

        /*	Calling "self.isConversationPresent" function,
        to check is conversation is already present or not.
        */
        var check_data = {
            to_id: data.to_id,
            from_id: data.from_id
        }
        /* 
        checking 'conversation' is present in Database conversation table
        */
        self.isConversationPresent(check_data,  function (is_present) {


            if (is_present.is_present) {

                var msg_after_conversation = {
                    to_id: data.to_id,
                    from_id: data.from_id,
                    msg: data.msg,
                    conversation_id: is_present.con_id
                };

                /* 
                caling 'self.callMsgAfterConversation' to insert message and conversation
                */
                self.callMsgAfterConversation(msg_after_conversation,  function (insert_con_msg) {
                    self.getUserInfo(data.from_id,  function (UserInfo) {
                        insert_con_msg.name = UserInfo.data.name;
                        callback(insert_con_msg);
                    });
                });


            } else {
                /* 
                call 'self.getLastConversationId' to get last conversation ID 
                */
                self.getLastConversationId( function (con_id) {

                    var msg_after_conversation = {
                        to_id: data.to_id,
                        from_id: data.from_id,
                        msg: data.msg,
                        conversation_id: con_id.ID
                    };

                    /* 
                    caling 'self.callMsgAfterConversation' to insert message and conversation
                    */
                    self.callMsgAfterConversation(msg_after_conversation,  function (insert_con_msg) {
                        self.getUserInfo(data.from_id,  function (UserInfo) {
                            insert_con_msg.name = UserInfo.data.name;
                            callback(insert_con_msg);
                        });
                    });
                });
            }

        });
    },
    getMsgs: function (data,  callback) {
        /*
        Function to get messages.
        */

        user.conversation_reply.find({ $or: [{ from_id: data.from_id, to_id: data.uid },
                                   { from_id: data.uid, to_id: data.from_id}]
        },
                         {},
                         {},
                         function (err, messages) {
                             //pushSvdMsgs(messages); 
                             if (messages) {
                                 callback(result)
                             } else {
                                 callback(null);
                             }
                         });

    },
    getUserInfo: function (uid,  callback) {
        /*
        Function to get user information.
        */
        user.user.findOne({
            _id: uid
        }, function (err, result) {
            if (result) {
                var user_info = "";
                //result.forEach(function (element, index, array) {
                    user_info = {
                        name: result.username,
                        p_photo: result.p_photo,
                        online: result.online
                    };
                //});
                result_send = {
                    data: user_info,
                    msg: "OK"
                };
            } else {
                result_send = {
                    data: null,
                    msg: "BAD"
                };
            }

            callback(result_send);
        });

    },
    getUserChatList: function (uid, connection, callback) {
        var data = {
            query: "select DISTINCT con_id from conversation where to_id='" + uid + "' or from_id='" + uid + "' order by timestamp desc ",
            connection: connection
        }
        self.queryRunner(data, function (result) {
            var dbUsers = [];
            if (result.length > 0) {
                result.forEach(function (element, index, array) {
                    var data = {
                        query: "select u.* from conversation as c left join user as u on \
								  u.id =case when (con_id='" + element.con_id + "' and to_id='" + uid + "') \
								THEN \
								  c.from_id \
								ELSE \
								  c.to_id \
								END \
								where con_id='" + element.con_id + "' and to_id='" + uid + "' or con_id='" + element.con_id + "' and from_id='" + uid + "' limit 1",
                        connection: connection
                    }
                    self.queryRunner(data, function (usersData) {
                        if (usersData.length > 0) {
                            dbUsers.push(usersData[0]);
                        }
                        if (index >= (result.length - 1)) {
                            callback(dbUsers);
                        }
                    });

                });
            } else {
                callback(null);
            }
        });
    },
    getUsersToChat: function (uid,  callback) {
    	/*
        var data = {
            query: "SELECT  to_id, from_id FROM conversation WHERE to_id='" + uid + "' OR from_id='" + uid + "' GROUP BY con_id DESC  ",
            connection: connection
        }
        self.queryRunner(data, function (result) {
            var dbUsers = [];
            if (result.length > 0) {
                var filter = [];
                result.forEach(function (element, index, array) {
                    filter.push(element['to_id']);
                    filter.push(element['from_id']);
                });
                filter = filter.join();
                data.query = "SELECT * FROM user WHERE id NOT IN (" + filter + ")";
            } else {
                data.query = "SELECT * FROM user WHERE id NOT IN (" + uid + ")";
            }
            self.queryRunner(data, function (usersData) {
                callback(usersData);
            });
        });
        */

        user.user.find({}, function(err, data){
        	if(data){
        		callback(data);
        	}else{

        	}
        })
    },
    mergeUsers: function (socketUsers, dbUsers, newUsers, callback) {
        /*
        Function Merge online and offline users.
        */
        var tempUsers = [];
        for (var i in socketUsers) {
            var shouldAdd = false;
            for (var j in dbUsers) {
                if (newUsers == 'yes') {
                    if (dbUsers[j].id == socketUsers[i].id) {
                        shouldAdd = false;
                        dbUsers.splice(j, 1); //Removing single user						
                        break;
                    }
                } else {
                    if (dbUsers[j].id == socketUsers[i].id) {
                        dbUsers[j].socketId = socketUsers[i].socketId;
                        shouldAdd = true;
                        break;
                    }
                }
            }
            if (!shouldAdd) {
                tempUsers.push(socketUsers[i]);
            }
        }
        if (newUsers == 'no') {
            tempUsers = tempUsers.concat(dbUsers);
        } else {
            tempUsers = dbUsers;
        }
        callback(tempUsers);
    }
}
module.exports = self;