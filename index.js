var express = require('express');
var app = express();
var fs = require('fs');
var fullArray = []
var tempArray = []
var lastUpdated = new Date()
var isUpdating = false

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template file


app.get('/', function(request, response) {  
  if (fullArray.length > 0) {
    var dateNow = new Date()
    // 18 second data timeout
    var secondsDif = (dateNow-lastUpdated)/1000/60/60
    var hoursToRequireUpdate = 1/120
    console.log("Seconds dif:",secondsDif)
    if (secondsDif >= hoursToRequireUpdate) {
      console.log("Data requires updating, but returning locations count from memory:",fullArray.length)

      if (!isUpdating) {
        isUpdating = true
        firstCall().then(function() {
          fullArray = tempArray
          isUpdating = false
          lastUpdated = dateNow
        })
      }
      response.json(fullArray)

    } else {
      // No update required 
      response.json(fullArray)
      console.log("Returning locations count from memory:",fullArray.length)
    }
  } else {
    if (isUpdating) {
      response.json(fullArray)
    } else {
      isUpdating = true
      firstCall().then(function() {
      var dateNow = new Date()
        lastUpdated = dateNow
        fullArray = tempArray
        isUpdating = false
        response.json(fullArray)
      })
    }
   
  }

}).end;

app.get('/refresh/', function(request, response) {

  if (isUpdating) {
      response.send("Already updating!")
    } else {
      isUpdating = true
      firstCall().then(function() {
      var dateNow = new Date()
        lastUpdated = dateNow
        fullArray = tempArray
        isUpdating = false
        var message = "Finished updating database with count of locations:" + fullArray.length
        response.status(200).send(message)
      })
    }

}).end

function firstCall() {
  tempArray = []
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
            tempArray.push(loc)
          }

          if (locationsCount > 50) {
            totalCallsRequired = Math.floor((locationsCount)/50)+1
            console.log("Total calls required: ",totalCallsRequired)
            timesRemaining = totalCallsRequired

            var actions = []

            for (i=2; i<=totalCallsRequired; i++) {
              actions.push(callAgain(i))
            }

            Promise.all(actions).then(function(data) {
              console.log("all", data.length)

              for (i=1; i<=data.length; i++) {
                tempArray = tempArray.concat(data[i-1])
              }
              resolve()
            })
           
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

            // tempArray = tempArray.concat(locations)
            resolve(locations)
        
      })}).end();
  })
  
}



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
