app.filter('slice', function() {
  return function(string, start, end) {
    return string.slice(start, end);
  };
});

app.filter('todate', function() {
  return function(string) {
    var dateOut = new Date(string);
    dateOut.setDate(dateOut.getDate());    
    return dateOut;
  };
});
