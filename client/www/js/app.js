// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('livekem', ['ionic']);

myApp

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", "$compileProvider",
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
        $ionicConfigProvider.tabs.position("top");
        $ionicConfigProvider.scrolling.jsScrolling(false);

        $compileProvider.debugInfoEnabled(false);

        $stateProvider

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "loginController"
                //views: {
                //    'tab-login': {
                //        templateUrl: "templates/login.html",
                //        controller: "loginController"
                //    }
                //}
            })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
        })

    .state('app.newEntry', {
        url: "/newEntry",
        views: {
            'tab-newEntry': {
                templateUrl: "templates/newEntry.html",
                controller: "newEntryController"
            }
        }
    })

    .state('app.inbox', {
        url: "/inbox",
        views: {
            'tab-inbox': {
                templateUrl: "templates/inbox.html",
                controller: "inboxController"
            }
        }
    })

    .state('app.chat', {
        url: "/inbox/:id",
        views: {
            'tab-chat': {
                templateUrl: "templates/chat.html",
                controller: "chatController"
            }
        }
    })

    .state('app.me', {
        url: "/me",
        views: {
            'tab-me': {
                templateUrl: "templates/me.html",
                controller: "meController"
            }
        }
    })

    .state('app.list', {
        url: "/list",
        views: {
            'tab-list': {
                templateUrl: "templates/list.html",
                controller: "listController"
            }
        }
    })

    .state('app.regio', {
        url: "/regio",
        views: {
            'tab-regio': {
                templateUrl: "templates/regio.html",
                controller: "regioController"
            }
        }
    })

    .state('app.search', {
        url: "/search",
        views: {
            'tab-search': {
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.video', {
        url: "/video",
        views: {
            'tab-video': {
                templateUrl: "templates/video.html",
                controller: "videoController"
            }
        }
    })

    .state('app.photo', {
        url: "/photo",
        views: {
            'tab-photo': {
                templateUrl: "templates/photo.html",
                controller: "photoController"
            }
        }
    })

    .state('app.cam', {
        url: "/cam",
        views: {
            'tab-cam': {
                templateUrl: "templates/cam.html",
                controller: "camController"
            }
        }
    })

    .state('app.camSetting', {
        url: "/camSetting",
        views: {
            'tab-camSetting': {
                templateUrl: "templates/camSetting.html"
            }
        }
    })

    .state('app.editText', {
        url: "/editText",
        views: {
            'tab-editText': {
                templateUrl: "templates/editText.html"
            }
        }
    })

    .state('app.editPhoto', {
        url: "/editPhoto",
        views: {
            'tab-editPhoto': {
                templateUrl: "templates/editPhoto.html"
            }
        }
    })

    .state('app.editVideo', {
        url: "/editVideo",
        views: {
            'tab-editVideo': {
                templateUrl: "templates/editVideo.html"
            }
        }
    });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/list');
    }]);
