myApp.controller('startController', function ($scope, $http, $rootScope, $location) {
    $scope.enterChat = function (nickname) {

        if(nickname == "" || nickname == undefined){
            $scope.message = 'Please enter a nickname!';
            return;
        }
        
        var param = JSON.stringify({
            nickname: nickname
        });
        
        var dd = $http.post("/start-chat", param);
        
        dd.then(function (data) {
            $rootScope.authenticated = true;
            sessionStorage.setItem('nickname', nickname);
            $rootScope.nickname = nickname;

            $location.path('/app/list');
        }, function (err) {
            //$scope.pages = page.data.data[0].page_data;
            alert(err);
        });
    };
});
