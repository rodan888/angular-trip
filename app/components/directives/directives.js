

app.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Jste si jisti?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);


app.directive("dropdown", function () {
    return {
        restrict: 'A',
        link: function (scope) {
            scope.selectedIndex = -1,
            scope.innerHeight = window.innerHeight,
            scope.toggleSelect = function (ind) {
                if (ind === scope.selectedIndex) {
                    scope.selectedIndex = -1;
                } else {
                    scope.selectedIndex = ind;
                }
            },
            scope.getClass = function (ind) {
                if (ind === scope.selectedIndex) {
                    return "selected";
                } else {
                    return "";
                }
            },
            scope.activeButton = function () {
                scope.classFactory.active = !scope.classFactory.active;
            };
        }
    };
});

app.directive('preloader', function(){
    return  {
        restrict: 'E',
        replace: true,
        template: '<div data-ng-show="preloader" id="loader-wrapper"> <div id="loader"></div> </div>'
    }
});

app.directive('btnMenu', function () {
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/templates/menu-button.html'
    }
});

app.directive('toggle', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function ($scope) {
            $scope.toggleButton = function () {
                if ($scope.visible) {
                    $scope.visible = false;
                } else {
                    $scope.visible = true;
                }
            };
        }
    };
});

app.directive('sortBy', function () {
    return{
        restrict: 'A',
        link: function ($scope) {
            $scope.sortByS = false,
            $scope.sortByB = false,
            $scope.selectedIndex = -1,
            $scope.placeholder = 'Vyberte skupinu',
            $scope.sortFnc = function (sort) {
                $scope.sortType = sort;
                if ($scope.sortByB == false) {
                    $scope.sortByB = true;
                    $scope.sortByS = false;
                } else {
                    $scope.sortByB = false;
                    $scope.sortByS = true;
                }
                ;
            },
            $scope.activeCalendar = function () {
                if ($scope.calendar) {
                    $scope.calendar = false;
                } else {
                    $scope.calendar = true;
                }
                ;
            },
            $scope.activefilter = function () {
                if ($scope.show) {
                    $scope.show = false;
                } else {
                    $scope.show = true;
                }
                ;
            },
            $scope.activeButton = function () {
                if ($scope.visible) {
                    $scope.visible = false;
                } else {
                    $scope.visible = true;
                }
                ;
            },
            $scope.getClass = function (ind) {
                if (ind === $scope.selectedIndex) {
                    return "visible";
                } else {
                    return "";
                }
            },
            $scope.toggleSelect = function (ind) {
                if (ind === $scope.selectedIndex) {
                    $scope.selectedIndex = -1;
                } else {
                    $scope.selectedIndex = ind;
                }
            };
        }
    };
});

// Multiselect of row
app.directive('multis', ['$document', function($document) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var el = [0,0];                

            element.on('click', function(event) { 
                    el = event.currentTarget.getAttribute("data-select");                                
                    var tr = element[0].querySelectorAll('tr'),
                        res = el.split(','),
                        start = Number(res[0]),
                        end = Number(res[1]);                                  
                if(event.ctrlKey) {
                    for (var i = 0; i < tr.length; i++) {                  
                            tr[i].style.background = '';
                    };
                    for (var i = start+2; i < end+3; i++) {                  
                            tr[i].style.background = '#C5C5C5';
                    };                
                }else{
                    for (var i = 0; i < tr.length; i++) {                  
                        tr[i].style.background = '';
                    };                
                };
            });       
        }
      };      
    }]);

//Chart zoom
app.directive('chartZoom', function(){
    return {
        restrict: 'CA',
        replace: false,
        link: function($scope, $attr, $element){             
            var el = $element,
                start,
                end,
                zoomCount = 0,
                x = 0,
                res = 0,
                xPos = 0,
                transform = {'transform':'translateX(0px) scaleX(1)'};

            // var time =  [1,2,3,4,5];
            // $scope.timeArr = time;

            $scope.trans = transform;
            $scope.dot = transform;
            $scope.dotScale = 1;
               
            $scope.resetZoom = function(){
                $scope.dotScale = 1;
                $scope.trans = transform;
                $scope.dot = transform;
                $scope.timeCount = 5;
                start,
                end,
                zoomCount = 0,
                x = 0;
            };

            $scope.start = function(e,w){
                start = e.offsetX==undefined?e.layerX:e.offsetX;                              
                xPos =  start * 100 / w;
                x = x+xPos;
            };                
            $scope.end = function(e, w){      
                var prev = x / 100,
                    res = prev + 1.0,
                    width = w * res,
                    tItem = width / 150; 
                

                // time.length = tItem.toFixed(0);
                $scope.widthTime = width;

                end = e.offsetX==undefined?e.layerX:e.offsetX;
                xs = end * 100 / w;
                zoomCount++;              
                $scope.trans = {'transform': 'translateX(-'+x / 2+'%) scaleX('+ res +')'};
                $scope.dotScale = res;
                $scope.dot = {'transform': 'translateX(-'+x / 2.025+'%)'};               

                $scope.timeCount = tItem.toFixed(0);
            };                   
        }
    }
});

//Square for chart zooming
app.directive('windowZoom', ['$document', function($document) {
  return {
    scope: {
        draggable: '=',
        resizable: '='
    },
      
    link: function(scope, element, attrs) {
      var startX = 0, 
          startY = 0, 
          x      = 0, 
          y      = 0,
          el     = document.getElementById('selectWind');
        element.on('mousedown', function(event) {
            if (!scope.draggable) return;
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);               
        });       

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;

        //x1 = event.screenX - x;
        // element.css({
        //   height: y + 'px',
        //   width:  x + 'px'
        // });
                
       var pos = event.offsetX==undefined?event.layerX:event.offsetX - x;
       el.style="height:" + y + "px; width:" + x + "px; left: " +pos+ "px;";
      }
      function mouseup() {
          startX = 0; 
          startY = 0;
          x = 0;
          y = 0;        
        el.style="height:" + y + "px; width:" + x + "px";
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);        
      }
    }
  };
}]);


//TripComposer directive

app.directive('popup' , function(){
  return {
    restrict: 'E',
    scope: false,
    replace: true,
    templateUrl: function($attr,$element){      
      return 'components/templates/'+$element.name+'.html';
    },
    link: function($scope, $attr, $element){ 
      $scope.indexTr = -1;

      $scope.popupEdd = function(ind){
        $scope.popupE = true;    
        $scope.indexTr = ind;        
      },     

      $scope.popupDisable = function(){
        $scope.popupE = false;       
      }
    }
  }  
});


app.directive("calendar", function () {
    return {
        restrict: "E",
        templateUrl: "components/templates/calendar.html",
        scope: {
            selected: "="
        },
        link: function (scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function (day) {
                scope.selected = day.date;
            };

            scope.next = function () {
                var next = scope.month.clone();
                _removeTime(next.month(next.month() + 1).date(1));
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function () {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false,
                date = start.clone(),
                monthIndex = date.month(),
                count = 0;
        while (!done) {
            scope.weeks.push({
                days: _buildWeek(date.clone(), month)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});