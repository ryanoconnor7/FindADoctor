const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
    // response.send("Hello from Firebase!");

    
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

        })
    }).end();

// var url = "https://api.yext.com/v2/accounts/1277495/locationsearch?api_key=5804b27c704c377a701bdad2309301d8&v=20170705"

});
