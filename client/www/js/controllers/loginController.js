myApp.controller('loginController', function ($scope, $http) {
    $scope.login = function (username, password) {
        
        var param = JSON.stringify({
            username: username,
            password: password
        });
        
        var dd = $http.post("/login", param);
        
        dd.then(function (data) {
            alert(data.data);
        }, function (err) {
            //$scope.pages = page.data.data[0].page_data;
            alert(err);
        });
    };
});
