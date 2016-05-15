myApp.controller('photoController', ['$scope',
    function($scope) {
        $scope.images = [];

        $scope.loadImages = function() {
            for (var i = 0; i < 52; i++) {
                $scope.images.push({
                    id: i,
                    src: "http://placehold.it/50x50"
                });
            }
        };
    }
]);
