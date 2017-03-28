var app = angular.module('mySite', ['ngRoute', 'ngAnimate']);

app.directive('mHeader', function(){
    return{
        restrict:'E',
        replace: true,
        template:'<header class="mHeader">'+
                    '<div class="wrapper">'+
                        '<div class="avatarDiv"></div>'+
                        '<span class="title">Welcome to my world!!</span>'+
                        '<ul>'+
                            '<li class="item" ng-repeat="item in titleItems">{{test($index)}}<a href="{{item.url}}">{{item.title}}</a><div class="selectBar"></div></li>'+
                        '</ul>'+
                    '</div>'+
                 '</header>',
        controller: function($scope, $location){

            $scope.titleItems = [
                {'title':'主页', 'url':'#/', isClass: "/"},
                {'title':'我的文章', 'url':'#/article', isClass: "/article"},
                {'title':'开发项目~', 'url':'#/post', isClass: "/post"},
                {'title':'关于我', 'url':'#/aboutMe', isClass: "/aboutMe"}
            ];

            $scope.test = function($index){
                var url = $location.url();
                ($scope.titleItems[$index].isClass === url) ? $('ul > li').eq($index).addClass('active'): $('ul > li').eq($index).removeClass('active');
            }
        }
    }
}).config(['$routeProvider', function($routeProvider){
                $routeProvider
                .when('/',{templateUrl:'./index.html'})
                .when('/article',{template:'我的文章'})
                .when('/post',{template:'开发项目'})
                .when('/aboutMe',{template:'关于我'})
                .otherwise({redirectTo:'/'})
            }
]).config(['$locationProvider', function($locationProvider) {
                $locationProvider.hashPrefix('');
}]);