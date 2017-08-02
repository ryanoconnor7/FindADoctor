var express = require('express');
var app = express();
var fs = require('fs');
var fullArray = []


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template file


app.get('/', function(request, response) {  
  if (fullArray.length > 0) {
    response.json(fullArray)
    console.log("Returning locations count from memory:",fullArray.length)
  } else {
    response.json(firstCall())
  }

});

app.get('/refresh/', function(request, response) {
  fullArray = []

  firstCall().then(function(data) {

      response.json(data)

  })


})

function firstCall() {
  return new Promise(function(resolve) {
  console.log("The array had this count before we did anything: ", fullArray.length)
  require('https').request({
      host: 'api.yext.com',
      path: '/v2/accounts/1277495/locationsearch?api_key=5804b27c704c377a701bdad2309301d8&v=20170705&limit=50',
      method: 'GET'
  }, function(res) {
      res.setEncoding('utf8');
      var body = '';
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
          body = JSON.parse(body);
          var locations = body["response"]["locations"]

          // Calc total calls 
          var locationsCount = body["response"]["count"]
          console.log("Locations count: ",locationsCount)

          for (i=1; i<=locations.length; i++) {
            var loc = locations[i-1]
            fullArray.push(loc)
          }

          if (locationsCount > 50) {
            totalCallsRequired = Math.floor((locationsCount)/50)+1
            console.log("Total calls required: ",totalCallsRequired)
            timesRemaining = totalCallsRequired

            var actions = []

            for (i=2; i<=totalCallsRequired; i++) {
              actions.push(callAgain(i))
            }

            var allArray = Promise.all(actions)
            console.log("all", allArray)
            
            // allArray.then(function(data) {
            //   fullArray = fullArray.concat(allArray)
            //   resolve(fullArray)
            // })
          }
        })}).end();

  })
  
}


function callAgain(index) {
  return new Promise(function(resolve) {
    var offset = 50 * index - 50
        require('https').request({
          host: 'api.yext.com',
          path: '/v2/accounts/1277495/locationsearch?api_key=5804b27c704c377a701bdad2309301d8&v=20170705&limit=50&offset='+offset,
          method: 'GET'
      }, function(res) {
          res.setEncoding('utf8');
          var body = '';
          res.on('data', function(chunk) {
              body += chunk;
          });
          res.on('end', function() {
              body = JSON.parse(body);
              var locations = body["response"]["locations"]
            console.log("called", index, "with these locations", locations.length)

            fullArray = fullArray.concat(locations)
            resolve(locations)
        // for (i=1; i<=locations.length; i++) {
        //   var loc = locations[i-1]
        //   fullArray.push(loc)
        // }
        
      })}).end();
  })
  
}



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
