app.factory('classFactory', function() {
	return {
		active: false
	}
});

app.factory('dateFactory', function() {
	return {
		date: new Date()
	}
});


app.factory('Data', function($http){
	return {
		getData : function(){
			var test = $http.get('http://ip-api.com/json/?callback=').success(function(res){
				return res;
			});
			return test;
		}
	}
});

//Multiselect call

app.factory('multiCall', function(){
  var items = [],
      arr = [0,0],
      flag = 0,
      res,
      time_start,
      time_end,
      dataC = [];
  return {
    setData: function(data){
      items = data;
    },  
    selected: function(ind){
      if (flag == 0 && ind <= arr[1]) {
            arr[0] = ind;
            flag++;
        }else{
            arr[1] = ind;
            flag = 0;            
        };      
        res = arr.join(',');  
      return res;
    },      
    dataCall: function(){
      dataC.length = 1;
      dataC[0] = time_start = items[arr[0]].time_start;
      dataC[1] = time_end = items[arr[1]].time_end;

      return dataC;
    }
  }
});

// Chart
app.factory('chart', function(){
 var items = [],
   paths = [],   
   width,   
   height,   
   currentPoint;  
 
 return {
  setData: function(data){
    items = data;
  },  
  setWidth: function(attr){
    width = attr;
  },
  setHeight: function(attr){
    height = attr;    
  }, 
  objLength: function(){
    Object.size = function(obj) {
       var size = 0, key, arr = [];
        for (key in obj) {
          if (obj.hasOwnProperty(key)){
           arr.push(key);
      size++;      
          }; 
        }      
         return size;
        };       
      return size = Object.size(items[1]);      
  },
  objProp: function(){
   Object.size = function(obj) {
    var size = 0, key, arr = [];
    for (key in obj) {
     if (obj.hasOwnProperty(key)){
      arr.push(key);                
     }; 
    }      
    return arr;
   };
   return arr = Object.size(items[1]);   
  },
  maxValue: function(){
   var lengthObj = this.objLength(),
     arr       = this.objProp(),
     maxValues = [];   
   for(var i = 0; i < lengthObj; i++){
    maxValues[i] = 0;    
   };
  
      for(var el = 0; el < lengthObj; el++){              
       for(var i = 0; i < items.length; i++){  
        if(items[i][arr[el]] > maxValues[el]){
         maxValues[el] = items[i][arr[el]];
        };      
       };      
      };   
      return maxValues;
  },

  labelPoint: function(){
    var lengthObj = this.objLength(),
        arr       = this.objProp(), 
        point     = [],
        points    = [];                  
    for(var el = 0; el < lengthObj; el++){
      for(var i = 0; i < items.length; i++){                 
        var start = el * items.length,
            end   = start+items.length;
        points.push(items[i][arr[el]]); 
       };
        point[el] = points.slice(start, end);
    };   
    return point;
  },

  path: function(){  
  var maxY      = this.maxValue(),
    lengthObj = this.objLength(),
    arr       = this.objProp(),  
    polyPaths = [];
  for(var el = 0; el < lengthObj; el++){
   for (var i = 0; i < items.length; i++) {
        currentPoint = items[i][arr[el]];
        paths.push(width/items.length*i +','+ currentPoint * ((height-10)/maxY[el]));
      }      
     polyPaths[el] = paths.slice(items.length*el, paths.length).join(' L ');
  }      
      return polyPaths;     
  },

  timeLine: function(count){ 
    var start = new Date(items[0].timestamp), 
    end = new Date(items[items.length-1].timestamp), 
    res = end - start, 
    arrL = (count / 1)+1; 
    timeArr = []; 
    res = res / 60000; 
    res = res.toFixed(2); 


    for (var i = 0; i<arrL; i++) { 
      var timeI = (res / count) * i; 
      timeI = timeI.toFixed(2); 
      timeArr[i] = timeI; 
    }; 
    for(var i = 0; i<timeArr.length; i++){ 
      timeArr[i] = timeArr[i].replace('.',':'); 
    }; 


   return timeArr; 
  },

  result: function(){
   var maxY = this.maxValue(),
     polyPaths = this.path(),
     name = this.objProp(),
     result = [],
     points = this.labelPoint();

   var Obj = function(max, paths, name, point){
    this.maxY = max;
    this.polyline = paths;
    this.name = name;
    this.point = point;
   };

   for(var i = 0; i < 18; i++){
    result.push(new Obj(maxY[i],polyPaths[i],name[i], points[i]));
   };
   return result;
  }
 };
});

app.factory('multiselect', function(){
    var items    = [],
        selected = [];

    return {
      setData: function(data){
        items = data;
      },
      selCompany: function(ind){
        selected.push(items[ind]);
        items.splice(ind,1);
        return items;
      },
      newList: function(){
        return selected;
      },
      removeList: function(ind){
        items.push(selected[ind]);
        selected.splice(ind,1);
        return selected;        
      },
      reselCompany: function(){        
        return items;
      },
      result: function(){
        return items;
      }
    };
});

app.factory('pagination', function($sce){
	var currentPage = 0,
	itemPerPage = 10,
	items       = [];

	return {
		setItems: function(newItems){
			items = newItems;
		},
		getPageItems: function(num){
			var num   = angular.isUndefined(num)?0:num,
			first = itemPerPage * num,
			last  = first + itemPerPage;
			currentPage = num;

			if(last > items.length){
				last = items.length -1;
			};
			return items.slice(first, last);
		},
		getTotalPagesNum: function(){
			return Math.ceil(items.length / itemPerPage);
		},
		getPaginationList: function(){
			var pagesNum = this.getTotalPagesNum(),
			paginationList = [];

			paginationList.push({
				name: $sce.trustAsHtml('<i class="icon icon-previous2"></i>'),
				link: 'first'
			},
			{
				name: $sce.trustAsHtml('<i class="icon icon-triangle-left"></i>'),
				link: 'prev'
			});

			for(var i = 0; i<pagesNum; i++){
				var name = i+1;
				paginationList.push({
					name: $sce.trustAsHtml(String(name)),
					link: i
				});
			};

			paginationList.push({
				name: $sce.trustAsHtml('<i class="icon icon-triangle-right"></i>'),
				link: 'next'
			},
			{
				name: $sce.trustAsHtml('<i class="icon icon-next2"></i>'),
				link: 'last'
			});

			if(pagesNum > 2){
				return paginationList;
			}else{
				return null;
			}
		},
		getCurrentPageNum: function(){
			return currentPage;
		},
		getPrevPageItems: function(){
			var prevPage = currentPage - 1;
			if(prevPage < 0)prevPage = 0;
			return this.getPageItems(prevPage);
		},
		getNextPageItems: function(){
			var nextPage = currentPage + 1,
			pagesNum = this.getTotalPagesNum();
			if(nextPage >= pagesNum) nextPage = pagesNum -1;
			return this.getPageItems(nextPage);
		}

	};
});