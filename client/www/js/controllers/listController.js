myApp.controller('listController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {
        $scope.items_old = [{
            id: 0
        }, {
            id: 1
        }, {
            id: 2
        }, {
            id: 3
        }, {
            id: 4
        }, {
            id: 5
        }, {
            id: 6
        }, {
            id: 7
        }, {
            id: 8
        }, {
            id: 9
        }, {
            id: 10
        }, {
            id: 11
        }, {
            id: 12
        }, {
            id: 13
        }, {
            id: 14
        }, {
            id: 15
        }, {
            id: 16
        }, {
            id: 17
        }, {
            id: 18
        }, {
            id: 19
        }, {
            id: 20
        }, {
            id: 21
        }, {
            id: 22
        }, {
            id: 23
        }, {
            id: 24
        }, {
            id: 25
        }, {
            id: 26
        }, {
            id: 27
        }, {
            id: 28
        }, {
            id: 29
        }, {
            id: 30
        }, {
            id: 31
        }, {
            id: 32
        }, {
            id: 33
        }, {
            id: 34
        }, {
            id: 35
        }, {
            id: 36
        }, {
            id: 37
        }, {
            id: 38
        }, {
            id: 39
        }, {
            id: 40
        }];

        socket.on('new entry', function () {
            var all_users = $http.get('/get-online-users');

            var ids = [];

            all_users.then(function (data) {
                console.log(data);

                //ids.push(data.id);

                $scope.items = data.data.users;
            })
        });

        socket.on('user exit', function (id) {
            var socketid = id;

            var do_offile = $http.get('/remove-user', { params: { socketid: socketid } });
            do_offile.then(function (dd) {
                var all_users = $http.get('/get-online-users');

                var ids = [];

                all_users.then(function (data) {
                    console.log(data);

                    //ids.push(data.id);

                    $scope.items = data.data.users;
                })
            });

        });


        var all_users = $http.get('/get-online-users');

        var ids = [];

        all_users.then(function (data) {
            console.log(data);

            //ids.push(data.id);

            $scope.items = data.data.users;
        })

        $scope.joinChat = function (userid) {
            if (userid.indexOf(sessionStorage.userid) > -1) {
                alert("You can't chat with yourself");
                return;
            } else {
                $location.path('/app/inbox/' + userid);
            }
        }

    }


]);
