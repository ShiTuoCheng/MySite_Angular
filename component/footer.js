var app = angular.module('mySite');

app.directive('mFooter', function(footerTimeFac, footerWeatherFac){
    return{
        restrict:'E',
        replace: true,
        template:'<footer class="mFooter">'+
                    '<div class="wrapper">'+
                        '<div class="timing">{{currentTime}}</div>'+
                        '<div class="weatherDiv">{{location}} | {{weatherState}} | {{weatherTemp}}</div>'+
                        '<div class="content">'+
                            '<span>Powered by </span>'+
                            '<img src="../../images/angular.jpg"/>'+
                        '</div>'+
                    '</div>'+
                 '</footer>',

        controller: function($scope, $interval, $timeout, $http){

            //视图界面初始化
            $scope.currentTime = footerTimeFac.getTime();
            $scope.location = '位置';
            $scope.weatherState = '天气情况';
            $scope.weatherTemp = '温度';

            getIP();
// 更新时间
            var updateClock = function() {
                $scope.currentTime = footerTimeFac.getTime();
            };
            $interval(updateClock, 1000);

            //获取ip地址
            function getIP(){

                $.getJSON("http://jsonip.com/?callback=?", (data) => {
                    setWeather(data.ip);
                });
            };

            //获取天气
            function setWeather(ipAddress){
                $.getJSON("https://free-api.heweather.com/v5/now?city="+ipAddress+"&key=56cb41b979f944b58c96e98c457a2f5b", (data) => {
                    $scope.location = data.HeWeather5[0].basic.city;
                    $scope.weatherState = data.HeWeather5[0].now.cond.txt;
                    $scope.weatherTemp = data.HeWeather5[0].now.tmp + '℃';
                });
            }
        }
    }
}).service('footerTimeFac', function(){

            var time = "";
 //获取时间
            this.getTime =function(){
                var date = new Date();

                return date.getFullYear()+ "年" + formateNum(date.getMonth()+1)+ "月" + formateNum(date.getDate()) + "日" + " 星期" + formateDay(date.getDay()) + " " + formateNum(date.getHours()) + ":" + formateNum(date.getMinutes()) + ":" + formateNum(date.getSeconds());
            };

// 格式化数字
            function formateNum(num){
                if (num < 10){

                    return "0" + num;
                }else{
          
                    return num;
                }
            };

// 格式化时间
            function formateDay(day){
                if (typeof day  === "number") {
                    if (day === 1){
                        return "一";
                    }else if(day === 2){
                        return "二";
                    }else if(day === 3){
                        return "三";
                    }else if(day === 4){
                        return "四";
                    }else if(day === 5){
                        return "五";
                    }else if(day === 6){
                        return "六";
                    }else if(day === 7){
                        return "七";
                    }
                }
            };
}).service('footerWeatherFac', function(){
    
});