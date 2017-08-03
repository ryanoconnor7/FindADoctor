var localArray = []
var localLastUpdated = new Date()

function updateData() {
    return new Promise(function(resolve) {
        if (localArray.length > 0) {
                var dateNow = new Date()

                var localHoursDif = (dateNow-localLastUpdated)/1000/60/60
                var hoursToRequireUpdateLocal = 1/120
                console.log("Hours dif:",localHoursDif)
                if (localHoursDif >= hoursToRequireUpdateLocal) {
                    console.log("Data requires updating. ",localArray.length)

                    makeCall().then(function() {
                        resolve()
                   })

                } else {
                // No update required 
                console.log("Using locations count from memory:", localArray.length)
                resolve()
                }
        } else {
            makeCall().then(function() {
                resolve()
            })
        }
    })
    
}

function makeCall() {
    return new Promise(function(resolve) {

        // change to where you host index.js
        var url = 'https://findadoctor.herokuapp.com'
        
        $.getJSON(url, function(data) {
            localArray = data
            console.log(localArray)
            resolve()
            localLastUpdated = new Date()
        });
    })
    
}

function searchLocations(text) {
    return new Promise(function(resolve) {
        var searchResults = []
            for (i=1; i<=localArray.length; i++) {
            var currentObj = localArray[i-1]
            var objStr = JSON.stringify(currentObj).toLowerCase()
            if (objStr.indexOf(text.toLowerCase()) > -1) {
                searchResults.push(currentObj)
            }
        }
        console.log(searchResults.length, " matches found:", searchResults)
        resolve(searchResults)
    })
}

