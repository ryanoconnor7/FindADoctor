
var locations = []
var totalCallsRequired = 0

specialtyURL = 'https://api.yext.com/v2/accounts/[accountId]/locations?api_key=API_KEY&v=20170705&limit=50'


function beginDownload() {
   $.getScript("DataManager.js").then(function() {
        console.log("Making call...")  
         makeAPICall(specialtyURL)
        .then(function(data) {
        console.log("DATA:", JSON.stringify(data))

        try {
        var json =  JSON.parse(JSON.stringify(data))
        console.log("JSON:", json)

        var locationsCount = json["response"]["count"]
        console.log("Locations count: ",locationsCount)

         locations.push(json["response"]["locations"])

        if (locationsCount > 50) {
            totalCallsRequired = Math.floor((locationsCount-50)/50)+1
            console.log("Total calls required: ",totalCallsRequired)
            token = json["response"]["nextPageToken"]
            timesRemaining = totalCallsRequired
            callAgain()
        }
        } 
        catch (e) {
        console.log("error:", e)
        }
        })
        .catch(function(error) {
        console.log("error: ", error) 
        
        })
})
}

beginDownload()

var token = ""

var timesRemaining = 0

function callAgain() {

    if (timesRemaining > 0) {
        $.getScript("DataManager.js").then(function() {
            console.log("Making call...")  
            
            var newURL = specialtyURL + "&pageToken="+token

            console.log(newURL)
            makeAPICall(newURL)
            .then(function(data) {
            console.log("DATA:", JSON.stringify(data))

            try {
            var json = JSON.parse(JSON.stringify(data))

             locations.push(json["response"]["locations"])

            token = json["response"]["nextPageToken"]
                    console.log("{",locations,"} locations in the array.")

                timesRemaining--
                callAgain()     

            } 
            catch (e) {
            console.log("error:", e)
            }
            })
            .catch(function(error) {
            console.log("error: ", error) 
            
            })
        }) 
    } else {
        console.log("COMPLETE")
    }
     
}