

function mainTextFieldChanged() {
        var textField = document.getElementById("Query")

        var additional = document.getElementById("additional-fields")

        console.log("keyed up on main search field")
        
        if (textField.value == 0) {
                // additional.style="visibility:hidden"

                console.log("should not show")
        } else {
                // additional.style="visibility:visible"
                console.log("should show")

                updateData().then(function() {
                    console.log("Ready to search \""+textField.value+'"')
                        searchLocations(textField.value).then(function(results) {

                                console.log("Received results ("+results.length+")")
                                var statusLabel = document.getElementById("status")
                                statusLabel.innerText = "Received results ("+results.length+")"

                        })
                })
        }
}

//  $.getScript("DataManager.js").then(function() {
//                                         console.log("Making call...")  
//                                         makeAPICall()
//                                         .then(function(data) {

//                                         try {
//                                         var json = JSON.parse(JSON.stringify(data))
//                                         console.log("JSON:", json)
//                                         handleSpecialtiesResponseSuccess(json)
//                                         } 
//                                         catch (e) {
//                                         console.log("error:", e)
//                                         }
//                                         })
//                                         .catch(function(error) {
//                                         console.log("error: ", error) 
                                        
//                                         })
//                                 })
