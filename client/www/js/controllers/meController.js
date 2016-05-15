myApp.controller('meController', ['$scope', '$ionicSlideBoxDelegate',
    function($scope, $ionicSlideBoxDelegate) {
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.pager = function (index) {
            $ionicSlideBoxDelegate.slide(index);
        };

        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        // $scope.options = {
        //     direction: 'vertical',
        //     slidesPerView: '1',
        //     paginationClickable: true,
        //     showNavButtons: false
        // };
        //
        // $scope.data = {};
        //
        // $scope.$watch('data.slider', function(slider) {
        //     console.log('My slider object is ', slider);
        // });
    }
]);
