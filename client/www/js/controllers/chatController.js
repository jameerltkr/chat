myApp.controller('chatController', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {
        $scope.sendMessage = function () {
            var toid = $location.url().split('/')[$location.url().split('/').length - 1];
            var fromid = sessionStorage.userid;
            var message = $scope.message;

            var param = JSON.stringify({
                fromid: fromid,
                toid: toid,
                msg: message
            });

            var dd = $http.post("/save-sent-message", param);

            dd.then(function (data) {
                //alert('Records saved in db.');
            }, function (err) {
                //$scope.pages = page.data.data[0].page_data;
                //alert('Error while saving records in database');
            });

            $("#mainMessage").append("<b>Me::</b> " + message + "<br>");
        }



        socket.on('msg', function (data) {
            var fromid = data.fromid;
            var toid = data.toid;

            if (toid == sessionStorage.userid) {
                //console.log('fdff');

                // $scope.msg = data.msg.msg;
                $("#mainMessage").append("<b>" + data.tonickname + "::</b> " + data.msg.msg + "<br>");

            }
        });

        $("#message").val('');
    }
]);
