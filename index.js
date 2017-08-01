var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template file


app.get('/', function(request, response) {

  require('https').request({
    host: 'api.yext.com',
    path: '/v2/accounts/1277495/locationsearch?api_key=5804b27c704c377a701bdad2309301d8&v=20170705',
    method: 'GET'
}, function(res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        body = JSON.parse(body);
        response.json(body);

      })
}).end();


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
